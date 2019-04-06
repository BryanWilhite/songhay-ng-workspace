import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { IndexOptions } from '../models/index-options';
import { IndexStyles } from '../models/index-styles';
import { IndexEntriesStore } from './index-entries.store';

import * as app from '../mocks/data/app-songhay-blog-q2-2018.json';
import { MockDomainConverterUtility } from '../mocks/services/mock-domain-converter.utility';

const options: IndexOptions = {
    appDataStoreOptions: MockDomainConverterUtility.getAppDataStoreOptions(),
    defaultDisplayStyle: IndexStyles.List,
    indexRouterLink: [],
    indexStoreUri: ''
};

describe(IndexEntriesStore.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: IndexOptions, useValue: options }, IndexEntriesStore]
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
    const propertyName = 'options';
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

                    control.flush([...app.index]);
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
                    const spy = spyOnProperty(
                        IndexEntriesStore.prototype,
                        propertyName,
                        'get'
                    ).and.callThrough();
                    expect(control.request.method).toBe(
                        endpointMethod.toUpperCase()
                    );

                    control.flush([...app.index]);

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
