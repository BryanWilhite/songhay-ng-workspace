import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelDataStore } from './you-tube-channel-data.store.js';

import * as videos from '../mocks/data/video-yt-bowie0-videos.json';

describe(`${YouTubeChannelDataStore.name}`, () => {
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

    const suffix = 'bowie0';
    const endpointMethod = 'get';
    const endpoint = YouTubeChannelDataStore.getUri(endpointMethod, '{suffix}');
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${suffix}\` once`, async(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getUri(
                        endpointMethod,
                        suffix
                    );
                    service.serviceData.subscribe();
                    service.load(uri);

                    const testRequest: TestRequest = controller.expectOne(uri);
                    expect(testRequest.request.method).toBe('GET');

                    testRequest.flush(videos);
                }
            )
        ));

        it('should call `options.domainConverter` once', async(
            inject(
                [YouTubeChannelDataStore, HttpTestingController],
                (
                    service: YouTubeChannelDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelDataStore.getUri(
                        endpointMethod,
                        suffix
                    );
                    service.load(uri);

                    const testRequest: TestRequest = controller.expectOne(uri);
                    expect(testRequest.request.method).toBe('GET');

                    testRequest.flush(videos);
                }
            )
        ));
    });
});
