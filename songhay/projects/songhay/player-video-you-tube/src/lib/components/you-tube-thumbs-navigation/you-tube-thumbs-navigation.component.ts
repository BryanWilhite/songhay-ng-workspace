import { Subscription, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { GenericWebIndex } from '../../models/generic-web-index';
import { GenericWebIndexUtility } from '../../utilities/generic-web-index.utility';
import { YouTubeChannelsIndexDataStore } from '../../services/you-tube-channels-index-data.store';

@Component({
    selector: 'rx-you-tube-thumbs-navigation',
    templateUrl: './you-tube-thumbs-navigation.component.html',
    styleUrls: ['./you-tube-thumbs-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class YouTubeThumbsNavigationComponent implements OnInit, OnDestroy {
    @Input()
    channelsIndexName: string;

    channels: {
        clientId: string;
        title: string;
    }[];
    channelsName: string;
    channelTitle: string;

    private channelSetId: string;
    private subscriptions: Subscription[] = [];

    constructor(
        public youTubeChannelsIndexDataStore: YouTubeChannelsIndexDataStore,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const sub = merge(
            this.route.params,
            this.youTubeChannelsIndexDataStore.serviceData
        )
            .pipe(
                filter(data =>
                    !(data as Params) || !(data as GenericWebIndex)
                        ? false
                        : true
                )
            )
            .subscribe(data => {
                const params = data as Params;
                const index = data as GenericWebIndex;

                this.channelSetId = params['id'] as string;

                this.channelsName = GenericWebIndexUtility.getChannelsSetDisplayName(
                    index
                );
                this.channels = index.documents as {
                    clientId: string;
                    title: string;
                }[];
                this.channelTitle = GenericWebIndexUtility.getChannelsSetTitle(
                    this.channelSetId,
                    index
                );

                this.subscriptions.push(sub);
            });

        this.youTubeChannelsIndexDataStore.load(
            YouTubeChannelsIndexDataStore.getUri('get', this.channelsIndexName)
        );
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    goBack() {
        this.location.back();
    }
}
