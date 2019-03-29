import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { YouTubeChannelSetDataStore } from '../../services/you-tube-channel-set-data.store';
import { YouTubeItem } from '../../models/you-tube-item';

@Component({
    selector: 'rx-you-tube-thumbs-set',
    templateUrl: './you-tube-thumbs-set.component.html',
    styleUrls: ['./you-tube-thumbs-set.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class YouTubeThumbsSetComponent implements OnInit, OnDestroy {
    @Input()
    thumbsSetSuffix: string;

    youTubeItemsKeys: string[];
    youTubeItemsMap: Map<string, YouTubeItem[]>;

    private subscriptions: Subscription[] = [];

    constructor(
        public youTubeChannelSetDataStore: YouTubeChannelSetDataStore,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const gotoNotFound = error => {
            console.warn({ component: YouTubeThumbsSetComponent.name, error });
            this.location.replaceState('/not-found');
        };

        const sub0 = this.route.params.subscribe(params => {
            const id = params['id'] as string;
            const suffix = params['suffix'] as string;

            const uri = YouTubeChannelSetDataStore.getUri('get', suffix, id);
            this.youTubeChannelSetDataStore.load(uri);
        });

        const sub1 = this.youTubeChannelSetDataStore.serviceError.subscribe(gotoNotFound);
        const sub2 = this.youTubeChannelSetDataStore.serviceData.subscribe(data => {
            this.youTubeItemsMap = data;
            this.youTubeItemsKeys = this.getKeys();
        });

        for (const sub of [sub0, sub1, sub2]) {
            this.subscriptions.push(sub);
        }
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private getKeys(): string[] {
        return Array.from(this.youTubeItemsMap.keys()).sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );
    }
}
