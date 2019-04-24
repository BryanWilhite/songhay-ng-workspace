import { Subscription, combineLatest, zip } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { YouTubeOptions } from '../../models/you-tube-options';
import { YouTubeRoutePaths } from '../../models/you-tube-route-paths';

import { GenericWebIndexUtility } from '../../utilities/generic-web-index.utility';
import { YouTubeCssOptionUtility } from '../../utilities/you-tube-css-option.utility';

import { YouTubeChannelsIndexDataStore } from '../../services/you-tube-channels-index-data.store';

@Component({
    selector: 'rx-you-tube-thumbs-navigation',
    templateUrl: './you-tube-thumbs-navigation.component.html',
    styleUrls: ['./you-tube-thumbs-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class YouTubeThumbsNavigationComponent implements OnInit, OnDestroy {

    @HostBinding('style') style: SafeStyle;

    @Input() channelsIndexName: string;

    channels: { clientId: string; title: string; }[];
    channelsName: string;
    channelTitle: string;

    private channelSetId: string;
    private subscriptions: Subscription[] = [];

    constructor(
        public youTubeChannelsIndexDataStore: YouTubeChannelsIndexDataStore,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
        private youTubeOptions: YouTubeOptions
    ) { }

    ngOnInit() {
        const css = YouTubeCssOptionUtility.getStyle(this.youTubeOptions.youTubeCssOptions);
        this.style = this.sanitizer.bypassSecurityTrustStyle(css);

        const sub = combineLatest(
            this.route.params,
            this.youTubeChannelsIndexDataStore.serviceData
        ).subscribe(data => {
            const params = data[0];
            const index = data[1];

            console.log(YouTubeThumbsNavigationComponent.name, { params, index });

            this.channelSetId = params['id'] as string;

            this.channels = index.documents as { clientId: string; title: string; }[];

            this.channelsName = GenericWebIndexUtility.getChannelsSetDisplayName(
                index
            );

            this.channelTitle = GenericWebIndexUtility.getChannelsSetTitle(
                this.channelSetId,
                index
            );
        });

        this.subscriptions.push(sub);

        this.youTubeChannelsIndexDataStore.load(
            YouTubeChannelsIndexDataStore.getUri('get', this.channelsIndexName)
        );
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    goBack(): void {
        this.location.back();
    }

    navigateToSet(id: string): void {
        this.router.navigate(
            [YouTubeRoutePaths.root, YouTubeRoutePaths.uploads, this.channelsIndexName, id],
            { relativeTo: (this.route.parent || this.route) }
        );
    }
}
