import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    YouTubeItem,
    YouTubeChannelDataStore
} from '@songhay/player-video-you-tube';

@Component({
    selector: 'app-thumbs',
    templateUrl: './thumbs.component.html',
    styleUrls: ['./thumbs.component.scss']
})
export class ThumbsComponent implements OnInit, OnDestroy {
    youTubeItems: YouTubeItem[];

    private subscriptions: Subscription[];

    constructor(public youTubeChannelDataStore: YouTubeChannelDataStore) {}

    ngOnInit() {
        const suffix = 'songhay-top-ten';
        const uri = YouTubeChannelDataStore.getUri(
            'get',
            `youtube-index-${suffix}`
        );
        const sub = this.youTubeChannelDataStore.serviceData.subscribe(data => {
            this.youTubeItems = data;
        });
        this.youTubeChannelDataStore.load(uri);

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
