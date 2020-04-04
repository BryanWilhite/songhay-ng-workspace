import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { IndexOptions } from '../models/index-options';
import { IndexFlowStyles } from '../models/index-flow-styles';
import { IndexRoutePaths, ROUTE_PARAM_DISPLAY_STYLE } from '../models/index-route-paths';

import { IndexEntriesStore } from '../services/index-entries.store';
import { IndexCssOptionUtility } from '../utilities/index-css-option.utility';

@Component({
    selector: 'rx-index-container',
    templateUrl: './index-container.component.html',
    styleUrls: ['./index-container.component.scss']
})
export class IndexContainerComponent implements OnInit, OnDestroy {

    @HostBinding('style') style: SafeStyle;

    viewStyle: IndexFlowStyles;

    private subscriptions: Subscription[] = [];

    constructor(
        public indexEntriesStore: IndexEntriesStore,
        public iconRegistry: MatIconRegistry,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private indexOptions: IndexOptions,
        private location: Location
    ) {}

    ngOnInit(): void {
        const css = IndexCssOptionUtility.getStyle(this.indexOptions.indexCssOptions);
        this.style = this.sanitizer.bypassSecurityTrustStyle(css);

        this.iconRegistry.addSvgIconSetInNamespace(
            'rx',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                this.indexOptions.indexStoreSpritesUri
            )
        );

        const sub1 = this.route.params.subscribe(params => {
            const param = params[ROUTE_PARAM_DISPLAY_STYLE] as IndexFlowStyles;

            if (!param) {
                const swap = `${this.location.path()}/${IndexRoutePaths.root}/${this.indexOptions.defaultDisplayStyle}`;
                this.viewStyle = this.indexOptions.defaultDisplayStyle;
                this.location.replaceState(swap);
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
