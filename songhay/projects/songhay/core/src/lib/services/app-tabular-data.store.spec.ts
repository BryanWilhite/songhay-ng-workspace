import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Typicode } from '../mocks/typicode.models';
import { MockTabularDomainStore, MockUserDomainStore, LIVE_API_BASE_URI } from '../mocks/mock-classes';

import { AppTabularDataStore } from './app-tabular-data.store';

describe(`${
    AppTabularDataStore.name
    } with initial, \`object[]\` value and \`any\` error`, () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    { provide: AppTabularDataStore, useClass: MockTabularDomainStore }
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

            it('should get Users from live server', waitForAsync(
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
