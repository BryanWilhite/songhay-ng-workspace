import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Typicode } from '../mocks/typicode.models';

import { AppDataStoreOptions } from './app-data-store.options';
import { AppTabularDataStore } from './app-tabular-data.store';

const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

class MockDomainStore extends AppTabularDataStore<object, any> {
    protected get options(): AppDataStoreOptions<object, any> {
        return {
            initialValue: () => ({ greeting: 'Hello world!' })
        };
    }
}

class MockUserDomainStore extends AppTabularDataStore<Typicode.User, any> {}

describe(`${
    AppTabularDataStore.name
} with initial, \`object[]\` value and \`any\` error`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                { provide: AppTabularDataStore, useClass: MockDomainStore }
            ]
        });
    });

    it('should be created', inject(
        [AppTabularDataStore],
        (service: AppTabularDataStore<object[], any>) => {
            expect(service).toBeTruthy();
        }
    ));

    describe('User service with `null` default value and `any` error', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppTabularDataStore, useClass: MockUserDomainStore }
                ]
            });
        });

        it('should get Users from live server', async(
            inject(
                [AppTabularDataStore],
                (service: AppTabularDataStore<Typicode.Photo, any>) => {
                    const uri = `${LIVE_API_BASE_URI}/users`;
                    service.serviceData.subscribe(data => {
                        console.log('Users: get', data);
                        expect(service.isError).toEqual(
                            false,
                            'An error was not expected.'
                        );
                        expect(data).toBeTruthy();
                    });
                    service.load(uri);
                }
            )
        ));
    });
});
