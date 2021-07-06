import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubePresentationDataStore } from './you-tube-presentation-data.store';

import * as presentation from '../mocks/data/video-yt-bowie0-presentation.json';

const segment = presentation['default'];

describe(`${YouTubePresentationDataStore.name} observable data service`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubePresentationDataStore]
        });
    });

    it('should instantiate', inject(
        [YouTubePresentationDataStore],
        (service: YouTubePresentationDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const id = 'bowie0';
    const endpointMethod = 'get';
    const endpoint = YouTubePresentationDataStore.getUri(
        endpointMethod,
        '{id}'
    );
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${id}\` once`, waitForAsync(
            inject(
                [YouTubePresentationDataStore, HttpTestingController],
                (
                    service: YouTubePresentationDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubePresentationDataStore.getUri(
                        endpointMethod,
                        id
                    );
                    service.serviceData.subscribe();
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    expect(control.request.method).toBe(endpointMethod.toUpperCase());

                    control.flush(segment);
                }
            )
        ));

        const methodName = 'getPresentation';
        it(`should call ${methodName} once and convert items to the domain`, waitForAsync(
            inject(
                [YouTubePresentationDataStore, HttpTestingController],
                (
                    service: YouTubePresentationDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubePresentationDataStore.getUri(
                        endpointMethod,
                        id
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubePresentationDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush(segment);

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
