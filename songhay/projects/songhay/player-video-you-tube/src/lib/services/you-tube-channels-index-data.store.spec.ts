import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelsIndexDataStore } from './you-tube-channels-index-data.store';

import * as index from '../mocks/data/video-yt-playlist-index-songhay.json';

const segment = index['default'];

describe(`${YouTubeChannelsIndexDataStore.name} observable data service`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubeChannelsIndexDataStore]
        });
    });

    it('should instantiate', inject(
        [YouTubeChannelsIndexDataStore],
        (service: YouTubeChannelsIndexDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const id = 'songhay';
    const endpointMethod = 'get';
    const endpoint = YouTubeChannelsIndexDataStore.getUri(
        endpointMethod,
        '{id}'
    );
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${id}\` once`, waitForAsync(
            inject(
                [YouTubeChannelsIndexDataStore, HttpTestingController],
                (
                    service: YouTubeChannelsIndexDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelsIndexDataStore.getUri(
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

        const methodName = 'getGenericWebIndex';
        it(`should call ${methodName} once and convert items to the domain`, waitForAsync(
            inject(
                [YouTubeChannelsIndexDataStore, HttpTestingController],
                (
                    service: YouTubeChannelsIndexDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelsIndexDataStore.getUri(
                        endpointMethod,
                        id
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubeChannelsIndexDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush(segment);

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
