import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CssUtility } from 'songhay/core/utilities/css.utility';

import { YouTubePresentation } from '../../models/you-tube-presentation';
import { YouTubePresentationStyles } from '../../models/you-tube-presentation-style';
import { YouTubeChannelDataStore } from '../../services/you-tube-channel-data.store';
import { YouTubeChannelsPresentationDataStore } from '../../services/you-tube-channels-presentation-data.store';

@Component({
    selector: 'rx-you-tube-presentation',
    templateUrl: './you-tube-presentation.component.html',
    styleUrls: ['./you-tube-presentation.component.scss']
})
export class YouTubePresentationComponent implements OnInit, OnDestroy {
    id: string;

    youTubePresentationStyles: YouTubePresentationStyles;

    youTubePresentation: YouTubePresentation;

    private subscriptions: Subscription[] = [];

    constructor(
        public youTubeChannelDataStore: YouTubeChannelDataStore,
        public youTubeChannelsPresentationDataStore: YouTubeChannelsPresentationDataStore,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const gotoNotFound = error => {
            console.warn({
                component: YouTubePresentationComponent.name,
                error
            });
            this.location.replaceState('/not-found');
        };

        const sub0 = this.route.params.subscribe(params => {
            this.id = params['id'] as string;

            this.youTubeChannelDataStore.load(
                YouTubeChannelDataStore.getUri('get', this.id)
            );
            this.youTubeChannelsPresentationDataStore.load(
                YouTubeChannelsPresentationDataStore.getUri('get', this.id)
            );
        });

        const sub1 = this.youTubeChannelDataStore.serviceError.subscribe(
            gotoNotFound
        );
        const sub2 = this.youTubeChannelDataStore.serviceData.subscribe(
            data => {
                this.youTubePresentation.videos = data;
            }
        );

        const sub3 = this.youTubeChannelsPresentationDataStore.serviceError.subscribe(
            gotoNotFound
        );
        const sub4 = this.youTubeChannelsPresentationDataStore.serviceData.subscribe(
            data => {
                this.youTubePresentation.presentation = data;
                this.youTubePresentationStyles.playlist = this.getPlaylistStyle();
                this.youTubePresentationStyles.prose = this.getProseStyle();
                this.youTubePresentationStyles.title = this.getTitleStyle();
            }
        );

        for (const sub of [sub0, sub1, sub2, sub3, sub4]) {
            this.subscriptions.push(sub);
        }
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    getBodyStyle(): {} {
        const data = this.youTubePresentation.presentation.layoutMetadata;
        return {
            'background-color': CssUtility.getColorHex(data['@backgroundColor'])
        };
    }

    getPlaylistStyle(): {} {
        const data = this.youTubePresentation.presentation.layoutMetadata
            .playlist;
        return {
            'background-color': CssUtility.getColorHex(
                data['@backgroundColor']
            ),
            color: CssUtility.getColorHex(data['@color'])
        };
    }

    getProseStyle(): {} {
        const data = this.youTubePresentation.presentation.layoutMetadata.prose;
        return {
            'background-color': CssUtility.getColorHex(
                data['@backgroundColor']
            ),
            color: CssUtility.getColorHex(data['@color'])
        };
    }

    getTitleStyle(): {} {
        const data = this.youTubePresentation.presentation.layoutMetadata.title;
        return {
            'background-color': CssUtility.getColorHex(
                data['@backgroundColor']
            ),
            color: CssUtility.getColorHex(data['@color']),
            display: CssUtility.getPixelValue(data['@display'])
        };
    }
}
