import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStore } from './app-data.store';
import { AppDataStoreOptions } from './app-data-store.options';
import { skip } from 'rxjs/operators';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

describe(`${AppDataStore.name} with initial, \`object\` value `, () => {
    const optionsForObject: AppDataStoreOptions<object, any> = {
        initialValue: () => ({ greeting: 'Hello world!' })
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                { provide: AppDataStoreOptions, useValue: optionsForObject },
                AppDataStore
            ]
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
            service.serviceData.subscribe(data => {
                console.log('object: initial value', data);
                isNext = true;
            });
            expect(isNext).toEqual(
                true,
                'Calling next in stream was expected.'
            );
        })
    ));

    it('should throw a 404 from live server', async(
        inject([AppDataStore], (service: AppDataStore<object, any>) => {
            const userId = 1;
            const uri = `${LIVE_API_BASE_URI}/users/wrong/${userId}`;
            let isNext = false;
            service.serviceData.pipe(skip(1)).subscribe(data => {
                console.log('Users: 404 get', data);
                isNext = true;
            });
            service.serviceError.subscribe(error => {
                console.log('Users: 404 get ERROR', error);
            });
            service.load(uri);

            expect(isNext).toEqual(
                false,
                'Calling next in stream was not expected.'
            );
            expect(service.isError).toEqual(true, 'An error was expected.');
        })
    ));

    describe('Photo service with `null` default value and `any` error', () => {
        const optionsForPhoto: AppDataStoreOptions<Typicode.Photo, any> = {};

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppDataStoreOptions, useValue: optionsForPhoto },
                    AppDataStore
                ]
            });
        });

        it('should not load null initial value', async(
            inject(
                [AppDataStore],
                (service: AppDataStore<Typicode.Photo, any>) => {
                    let isNext = false;
                    service.serviceData.subscribe(data => {
                        console.log('Photo: initial value', data);
                        isNext = true;
                    });
                    expect(isNext).toEqual(false);
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
                } catch {
                    console.log('Photo: 404 result', result);
                }

                expect(service.isError).toEqual(true);
            }
        ));
    });
});
