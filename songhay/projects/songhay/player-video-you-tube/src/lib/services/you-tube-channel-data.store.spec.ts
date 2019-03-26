import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { YouTubeChannelDataStore } from './you-tube-channel-data.store.js';

import * as videos from '../mocks/data/video-yt-bowie0-videos.json';

describe(`${YouTubeChannelDataStore.name}`, () => {
    console.log('yup', videos.items);
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

    const endpointMethod = 'get';
    const endpoint = YouTubeChannelDataStore.getUri(endpointMethod, '{suffix}');
    describe(`endpoint: ${endpoint}`, () => {});
});
