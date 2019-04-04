import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { MockDomainStore } from '../mocks/services/mock-domain.store';
import { IndexEntriesStore } from './index-entries.store';

import * as app from '../mocks/data/app-songhay-blog-q2-2018.json';

describe(IndexEntriesStore.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MockDomainStore]
        });
    });

    it('should instantiate', inject(
        [MockDomainStore],
        (service: MockDomainStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const endpoint = 'assets/data/app.json';
    const endpointMethod = 'get';
    const methodName = 'getEntries';
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} once`, async(
            inject(
                [MockDomainStore, HttpTestingController],
                (
                    service: MockDomainStore,
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

        it(`should call ${methodName} once and convert items to the domain`, async(
            inject(
                [MockDomainStore, HttpTestingController],
                (
                    service: MockDomainStore,
                    controller: HttpTestingController
                ) => {
                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(endpoint);

                    const control: TestRequest = controller.expectOne(endpoint);
                    const spy = spyOn(
                        MockDomainStore,
                        methodName
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
