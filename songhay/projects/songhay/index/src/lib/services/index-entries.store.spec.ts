import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { IndexOptions } from '../models/index-options';
import { IndexEntriesStore } from './index-entries.store';

import * as app from '../mocks/data/app-songhay-blog-q2-2018.json';
import { MockDomainConverterUtility } from '../mocks/services/mock-domain-converter.utility';

const options: IndexOptions = new IndexOptions();
options.appDataStoreOptions = MockDomainConverterUtility.getAppDataStoreOptions();

describe(IndexEntriesStore.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                IndexEntriesStore,
                { provide: IndexOptions, useValue: options }
            ]
        });
    });

    it('should instantiate', inject(
        [IndexEntriesStore],
        (service: IndexEntriesStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const endpoint = 'assets/data/app.json';
    const endpointMethod = 'get';
    const propertyName = 'domainConverter';
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} once`, async(
            inject(
                [IndexEntriesStore, HttpTestingController],
                (
                    service: IndexEntriesStore,
                    controller: HttpTestingController
                ) => {
                    service.serviceData.subscribe();
                    service.load(endpoint);

                    const control: TestRequest = controller.expectOne(endpoint);
                    expect(control.request.method).toBe(
                        endpointMethod.toUpperCase()
                    );

                    control.flush({ index: app.index });
                }
            )
        ));

        it(`should call ${propertyName} once and convert items to the domain`, async(
            inject(
                [IndexEntriesStore, HttpTestingController],
                (
                    service: IndexEntriesStore,
                    controller: HttpTestingController
                ) => {
                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(endpoint);

                    const control: TestRequest = controller.expectOne(endpoint);
                    const spy = spyOn(service.options, propertyName).and.callThrough();
                    expect(control.request.method).toBe(
                        endpointMethod.toUpperCase()
                    );

                    control.flush({ index: app.index });

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
