import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
import { ChangeDetectionStrategy, HostBinding, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { YouTubeItem } from '../../models/you-tube-item';
import { YouTubeOptions } from '../../models/you-tube-options';
import { YouTubeChannelSetDataStore } from '../../services/you-tube-channel-set-data.store';
import { YouTubeCssOptionUtility } from '../../utilities/you-tube-css-option.utility';

@Component({
    selector: 'rx-you-tube-thumbs-set',
    templateUrl: './you-tube-thumbs-set.component.html',
    styleUrls: ['./you-tube-thumbs-set.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class YouTubeThumbsSetComponent implements OnInit, OnDestroy {

    @HostBinding('style') style: SafeStyle;

    @Input() thumbsSetSuffix: string;

    youTubeItemsKeys: string[];
    youTubeItemsMap: Map<string, YouTubeItem[]>;

    private subscriptions: Subscription[] = [];

    constructor(
        public youTubeChannelSetDataStore: YouTubeChannelSetDataStore,
        private location: Location,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private youTubeOptions: YouTubeOptions
    ) {}

    ngOnInit() {
        const css = YouTubeCssOptionUtility.getStyle(this.youTubeOptions.youTubeCssOptions);
        this.style = this.sanitizer.bypassSecurityTrustStyle(css);

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
