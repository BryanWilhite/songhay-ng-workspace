import { Component, OnInit } from '@angular/core';
import {
    YouTubeItem,
    YouTubeDataService
} from '@songhay/player-video-you-tube';

@Component({
    selector: 'app-yt',
    templateUrl: './yt.component.html',
    styleUrls: ['./yt.component.scss']
})
export class YtComponent implements OnInit {
    youTubeItems: YouTubeItem[];

    constructor(public youTubeDataService: YouTubeDataService) {}

    ngOnInit() {
        this.youTubeDataService.loadChannel('youtube-index-songhay-top-ten');

        this.youTubeDataService.channelLoaded.subscribe(json => {
            this.youTubeItems = YouTubeDataService.getItems(json);
        });
    }
}
