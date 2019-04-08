import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { IndexOptions } from '../models/index-options';
import { IndexStyles } from '../models/index-styles';
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
        private indexOptions: IndexOptions,
        private sanitizer: DomSanitizer
    ) {
        this.iconRegistry.addSvgIconSetInNamespace(
            'rx',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                this.indexOptions.indexStoreSpritesUri
            )
        );

        this.viewStyle = this.indexOptions.defaultDisplayStyle;
    }

    ngOnInit(): void {
        const sub1 = this.route.params.subscribe(params => {
            this.viewStyle = params['style'] as any;
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
