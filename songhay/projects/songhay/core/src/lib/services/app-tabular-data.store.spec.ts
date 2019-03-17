import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStoreOptions } from './app-data-store.options';
import { AppTabularDataStore } from './app-tabular-data.store';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

describe(`${AppTabularDataStore.name} with initial, \`object[]\` value and \`any\` error`, () => {
    const optionsForObject: AppDataStoreOptions<object, any> = {
        initialValue: () => [{ greeting: 'Hello world!' }]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                { provide: AppDataStoreOptions, useValue: optionsForObject },
                AppTabularDataStore
            ]
        });
    });

    it('should be created', inject(
        [AppTabularDataStore],
        (service: AppTabularDataStore<object[], any>) => {
            expect(service).toBeTruthy();
        }
    ));

    describe('Photo service with `null` default value and `any` error', () => {
        const optionsForPhoto: AppDataStoreOptions<Typicode.Photo, any> = {};

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppDataStoreOptions, useValue: optionsForPhoto },
                    AppTabularDataStore
                ]
            });
        });
    });

});
