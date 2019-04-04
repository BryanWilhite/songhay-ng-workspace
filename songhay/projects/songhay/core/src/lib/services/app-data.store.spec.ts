import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStoreOptions } from './app-data-store.options';
import { AppDataStore } from './app-data.store';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

class MockDomainStore extends AppDataStore<object, any> {
    get options(): AppDataStoreOptions<object, any> {
        return {
            initialValue: () => ({ greeting: 'Hello world!' })
        };
    }
}

class MockPhotoDomainStore extends AppDataStore<Typicode.Photo, any> {}

describe(`${
    AppDataStore.name
} with initial, \`object\` value and \`any\` error`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [{ provide: AppDataStore, useClass: MockDomainStore }]
        });
    });

    it('should be created', inject(
        [AppDataStore],
        (service: AppDataStore<object, any>) => {
            expect(service).toBeTruthy();
        }
    ));

    it('should load initial value', async(
        inject([AppDataStore], (service: AppDataStore<object, any>) => {
            let isNext = false;

            service.serviceData
                .subscribe(data => {
                    // internal `BehaviorSubject` will emit last value upon subscription:
                    console.log('object: initial value', data);

                    expect(data).toBeTruthy();
                    expect(
                        Object.keys(data).findIndex(k => k === 'greeting')
                    ).toBeGreaterThan(-1);

                    isNext = true;
                })
                .add(() => {
                    expect(isNext).toEqual(true);
                })
                .unsubscribe();
        })
    ));

    it('should throw a 404 from live server', async(
        inject([AppDataStore], (service: AppDataStore<object, any>) => {
            const userId = 11;
            const uri = `${LIVE_API_BASE_URI}/users/${userId}`;
            service.serviceError.subscribe(exception => {
                console.log('Users: 404 get ERROR', { exception });

                const error = exception as HttpErrorResponse;
                expect(error).toBeTruthy();
                expect(error.status).toEqual(404);

                expect(service.isError).toEqual(true);
            });
            service.load(uri);
        })
    ));

    describe('Photo service with `null` default value and `any` error', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppDataStore, useClass: MockPhotoDomainStore }
                ]
            });
        });

        it('should not load null initial value', async(
            inject(
                [AppDataStore],
                (service: AppDataStore<Typicode.Photo, any>) => {
                    let isNext = false;

                    service.serviceData
                        .subscribe(data => {
                            console.log(
                                'Photo: initial value [should not run]',
                                data
                            );
                            isNext = true;
                        })
                        .add(() => {
                            console.log('Photo: initial value');
                            expect(isNext).toEqual(false);
                        })
                        .unsubscribe();
                }
            )
        ));

        it('should get Photo from live server', async(
            inject(
                [AppDataStore],
                (service: AppDataStore<Typicode.Photo, any>) => {
                    const photoId = 1;
                    const uri = `${LIVE_API_BASE_URI}/photos/${photoId}`;
                    service.serviceData.subscribe(data => {
                        console.log('Photo: get', data);
                        expect(service.isError).toEqual(
                            false,
                            'An error was not expected.'
                        );
                        expect(data).toBeTruthy();
                        expect(data.id).toEqual(photoId);
                    });
                    service.load(uri);
                }
            )
        ));

        it('should delete Photo from live server', async(
            inject(
                [AppDataStore],
                (service: AppDataStore<Typicode.Photo, any>) => {
                    const photoId = 1;
                    const uri = `${LIVE_API_BASE_URI}/photos/${photoId}`;
                    service.serviceData.subscribe(data => {
                        console.log('Photo: delete', data);
                        expect(service.isError).toEqual(
                            false,
                            'An error was not expected.'
                        );
                        expect(data).toBeTruthy();
                    });
                    service.send('delete', uri);
                }
            )
        ));

        it('should delete Photo from live server [Promise]', inject(
            [AppDataStore],
            async (service: AppDataStore<Typicode.Photo, any>) => {
                const photoId = 1;
                const uri = `${LIVE_API_BASE_URI}/photos/${photoId}`;
                const result = await service.sendAsync('delete', uri);
                console.log('Photo: delete [Promise]', result);
                expect(service.isError).toEqual(false);
            }
        ));

        it('should put Photo from live server [Promise]', inject(
            [AppDataStore],
            async (service: AppDataStore<Typicode.Photo, any>) => {
                const photoId = 1;
                const albumId = 999;
                const uri = `${LIVE_API_BASE_URI}/photos/${photoId}`;
                const body: Typicode.Photo = {
                    id: photoId,
                    albumId: albumId,
                    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
                    title: 'accusamus beatae ad facilis cum similique qui sunt',
                    url: 'https://via.placeholder.com/600/92c952'
                };

                const result = await service.sendAsync('put', uri, body);

                console.log('Photo: put [Promise]', result);
                const photo = result as Typicode.Photo;
                expect(photo).toBeTruthy();
                expect(photo.albumId).toEqual(albumId);
            }
        ));

        it('should patch Photo from live server [Promise]', inject(
            [AppDataStore],
            async (service: AppDataStore<Typicode.Photo, any>) => {
                const albumId = 999;
                const uri = `${LIVE_API_BASE_URI}/photos/1`;
                const body = { albumId: albumId };

                const result = await service.sendAsync('patch', uri, body);

                console.log('Photo: patch [Promise]', result);
                const photo = result as Typicode.Photo;
                expect(photo).toBeTruthy();
                expect(photo.albumId).toEqual(albumId);
            }
        ));

        it('should throw a 404 from live server [Promise]', inject(
            [AppDataStore],
            async (service: AppDataStore<Typicode.Photo, any>) => {
                const userId = 1;
                const uri = `${LIVE_API_BASE_URI}/photos/wrong/${userId}`;

                let result: any;
                try {
                    result = await service.loadAsync(uri);
                } catch (exception) {
                    console.log('Photo: 404 result', { result, exception });

                    const error = exception as HttpErrorResponse;
                    expect(error).toBeTruthy();
                    expect(error.status).toEqual(404);

                    expect(service.isError).toEqual(true);
                }
            }
        ));
    });
});
