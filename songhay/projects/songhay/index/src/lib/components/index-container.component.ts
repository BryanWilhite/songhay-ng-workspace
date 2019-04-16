import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { IndexOptions } from '../models/index-options';
import { IndexStyles } from '../models/index-styles';
import { IndexRoutePaths, ROUTE_PARAM_DISPLAY_STYLE } from '../models/index-route-paths';

import { IndexEntriesStore } from '../services/index-entries.store';

@Component({
    selector: 'rx-index-container',
    templateUrl: './index-container.component.html',
    styleUrls: ['./index-container.component.scss']
})
export class IndexContainerComponent implements OnInit, OnDestroy {
    viewStyle: IndexStyles;

    private subscriptions: Subscription[] = [];

    constructor(
        public indexEntriesStore: IndexEntriesStore,
        public iconRegistry: MatIconRegistry,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private indexOptions: IndexOptions,
        private location: Location
    ) {
        this.iconRegistry.addSvgIconSetInNamespace(
            'rx',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                this.indexOptions.indexStoreSpritesUri
            )
        );
    }

    ngOnInit(): void {
        const sub1 = this.route.params.subscribe(params => {
            const param = params[ROUTE_PARAM_DISPLAY_STYLE] as IndexStyles;

            if (!param) {
                const redirect = `${IndexRoutePaths.root}/${this.indexOptions.defaultDisplayStyle}`;
                this.location.replaceState(redirect);
            } else {
                this.viewStyle = param;
            }
        });

        this.indexEntriesStore.load(
            this.indexOptions.indexStoreDataUri
        );

        [sub1].forEach(sub => this.subscriptions.push(sub));
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
