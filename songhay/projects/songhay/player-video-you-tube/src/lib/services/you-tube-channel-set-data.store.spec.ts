import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { YouTubeChannelSetDataStore } from './you-tube-channel-set-data.store';

import * as playlists from '../mocks/data/video-yt-playlists-songhay-news.json';

describe(`${YouTubeChannelSetDataStore.name} observable data service`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [YouTubeChannelSetDataStore]
        });
    });

    it('should instantiate', inject(
        [YouTubeChannelSetDataStore],
        (service: YouTubeChannelSetDataStore) => {
            expect(service).toBeTruthy();
        }
    ));

    const suffix = 'songhay';
    const id = 'news';
    const endpointMethod = 'get';
    const endpoint = YouTubeChannelSetDataStore.getUri(
        endpointMethod,
        '{suffix}',
        '{id}'
    );
    describe(`endpoint: ${endpoint}`, () => {
        it(`should ${endpointMethod} \`${suffix}\` \`${id}\` once`, async(
            inject(
                [YouTubeChannelSetDataStore, HttpTestingController],
                (
                    service: YouTubeChannelSetDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelSetDataStore.getUri(
                        endpointMethod,
                        suffix,
                        id
                    );
                    service.serviceData.subscribe();
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    expect(control.request.method).toBe(endpointMethod.toUpperCase());

                    control.flush({ set: playlists.set });
                }
            )
        ));

        const methodName = 'getItemsMap';
        it(`should call ${methodName} once and convert items to the domain`, async(
            inject(
                [YouTubeChannelSetDataStore, HttpTestingController],
                (
                    service: YouTubeChannelSetDataStore,
                    controller: HttpTestingController
                ) => {
                    const uri = YouTubeChannelSetDataStore.getUri(
                        endpointMethod,
                        suffix
                    );

                    service.serviceData.subscribe(data =>
                        console.log({ endpoint, data })
                    );
                    service.load(uri);

                    const control: TestRequest = controller.expectOne(uri);
                    const spy = spyOn(
                        YouTubeChannelSetDataStore,
                        methodName
                    ).and.callThrough();

                    control.flush({ set: playlists.set });

                    expect(spy).toHaveBeenCalledTimes(1);
                }
            )
        ));
    });
});
