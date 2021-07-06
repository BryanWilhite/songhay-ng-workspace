import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelDataStore } from './you-tube-channel-data.store.js';

import * as uploads from '../mocks/data/video-yt-playlist-uploads-songhay-top-ten.json';
import * as videos from '../mocks/data/video-yt-bowie0-videos.json';

describe(`${YouTubeChannelDataStore.name} observable data service`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubeChannelDataStore]
        });
    });

    it('should instantiate', inject(
        [YouTubeChannelDataStore],
        (service: YouTubeChannelDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const id = 'youtube-index-songhay-top-ten';
    const endpointMethod = 'get';
    const endpoint = YouTubeChannelDataStore.getUri(endpointMethod, '{id}');
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${id}\` once`, waitForAsync(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getUri(
                        endpointMethod,
                        id
                    );
                    service.serviceData.subscribe();
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    expect(control.request.method).toBe(
                        endpointMethod.toUpperCase()
                    );

                    control.flush({ items: uploads.items });
                }
            )
        ));

        const methodName = 'getItems';
        it(`should call ${methodName} once and convert items to the domain`, waitForAsync(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getUri(
                        endpointMethod,
                        id
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubeChannelDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush({ items: uploads.items });

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });

    const presentation_id = 'bowie0';
    const presentation_endpoint = YouTubeChannelDataStore.getPresentationUri(
        endpointMethod,
        '{id}'
    );
    describe(`endpoint: ${presentation_endpoint}`, () => {
        it(`should ${endpointMethod} \`${presentation_id}\` once`, waitForAsync(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getPresentationUri(
                        endpointMethod,
                        presentation_id
                    );
                    service.serviceData.subscribe();
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    expect(control.request.method).toBe(
                        endpointMethod.toUpperCase()
                    );

                    control.flush({ items: videos.items });
                }
            )
        ));

        const methodName = 'getItems';
        it(`should call ${methodName} once and convert items to the domain`, waitForAsync(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getPresentationUri(
                        endpointMethod,
                        presentation_id
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ presentation_endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubeChannelDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush({ items: videos.items });

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
