import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelDataStore } from './you-tube-channel-data.store.js';

import * as videos from '../mocks/data/video-yt-bowie0-videos.json';

describe(`${YouTubeChannelDataStore.name}`, () => {
    const getOptionsMethodName = 'getOptions';
    let spyOnGetOptions: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubeChannelDataStore]
        });

        spyOnGetOptions = spyOn(YouTubeChannelDataStore, getOptionsMethodName);
    });

    it('should instantiate', inject(
        [YouTubeChannelDataStore],
        (service: YouTubeChannelDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    it(`should call ${getOptionsMethodName} once`, inject(
        [YouTubeChannelDataStore],
        (service: YouTubeChannelDataStore) => {
            expect(spyOnGetOptions).toHaveBeenCalledTimes(1);
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
                    const spy = spyOn(service.options, 'domainConverter').and.callThrough();
                    service.serviceData.subscribe(data => expect(spy).toHaveBeenCalledTimes(1));
                    service.load(uri);

                    const testRequest: TestRequest = controller.expectOne(uri);
                    expect(testRequest.request.method).toBe('GET');

                    testRequest.flush(videos);
                }
            )
        ));
    });
});
