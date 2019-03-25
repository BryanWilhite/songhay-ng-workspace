import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { YouTubeChannelDataStore } from './you-tube-channel-data.store.js';

import * as videos from '../mocks/data/video-yt-bowie0-videos.json';

describe(`${YouTubeChannelDataStore.name}`, () => {
    console.log('yup', videos.items);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                YouTubeChannelDataStore
            ]
        });
    });

    it('should instantiate', inject(
        [YouTubeChannelDataStore],
        (service: YouTubeChannelDataStore) => {
            expect(service).toBeTruthy();
        }
    ));
});
