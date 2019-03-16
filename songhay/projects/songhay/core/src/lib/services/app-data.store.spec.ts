import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStore } from './app-data.store';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

describe(AppDataStore.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AppDataStore]
        });
    });

    it('should be created',
        inject(
            [AppDataStore],
            (service: AppDataStore<Typicode.Photo>) => {
                expect(service).toBeTruthy();
            }
        ));

    it('should load a photo from the live server',
        async(
            inject([AppDataStore],
                (service: AppDataStore<Typicode.Photo>) => {
                    const uri = `${LIVE_API_BASE_URI}/photos/1`;
                    service.serviceData.subscribe(data => {
                        expect(data).toBeTruthy();
                        expect(data.id).toEqual(1);
                    });
                    service.load(uri);
                })));
});
