import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStore } from './app-data.store';
import { AppDataStoreOptions } from './app-data-store.options';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

describe(AppDataStore.name, () => {
    describe('Photo service with `null` default value and `any` error', () => {
        const options: AppDataStoreOptions<Typicode.Photo, any> = {};

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppDataStoreOptions, useValue: options },
                    AppDataStore
                ]
            });
        });

        it('should be created',
            inject(
                [AppDataStore],
                (service: AppDataStore<Typicode.Photo, any>) => {
                    expect(service).toBeTruthy();
                }
            ));

        it('should not load a default value',
            async(
                inject([AppDataStore],
                    (service: AppDataStore<Typicode.Photo, any>) => {
                        let subscribeInvoked = false;
                        service.serviceData.subscribe(data => {
                            console.log(data);
                            subscribeInvoked = true;
                        });
                        expect(subscribeInvoked).toEqual(false, 'Calling subscribe was not expected.');
                    })));

        it('should load Photo from live server',
            async(
                inject([AppDataStore],
                    (service: AppDataStore<Typicode.Photo, any>) => {
                        const photoId = 1;
                        const uri = `${LIVE_API_BASE_URI}/photos/${photoId}`;
                        service.serviceData.subscribe(data => {
                            console.log(data);
                            expect(data).toBeTruthy();
                            expect(data.id).toEqual(photoId);
                        });
                        service.load(uri);
                    })));
    });
});
