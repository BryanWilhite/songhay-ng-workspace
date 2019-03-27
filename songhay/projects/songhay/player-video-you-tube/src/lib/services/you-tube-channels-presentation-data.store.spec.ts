import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelsPresentationDataStore } from './you-tube-channels-presentation-data.store';

import * as presentation from '../mocks/data/video-yt-bowie0-presentation.json';

const segment = presentation['default'];

describe(`${YouTubeChannelsPresentationDataStore} observable data service`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubeChannelsPresentationDataStore]
        });
    });

    it('should instantiate', inject(
        [YouTubeChannelsPresentationDataStore],
        (service: YouTubeChannelsPresentationDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const id = 'bowie0';
    const endpointMethod = 'get';
    const endpoint = YouTubeChannelsPresentationDataStore.getUri(
        endpointMethod,
        '{id}'
    );
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${id}\` once`, async(
            inject(
                [YouTubeChannelsPresentationDataStore, HttpTestingController],
                (
                    service: YouTubeChannelsPresentationDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelsPresentationDataStore.getUri(
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
        it(`should call ${methodName} once and convert items to the domain`, async(
            inject(
                [YouTubeChannelsPresentationDataStore, HttpTestingController],
                (
                    service: YouTubeChannelsPresentationDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelsPresentationDataStore.getUri(
                        endpointMethod,
                        id
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubeChannelsPresentationDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush(segment);

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
