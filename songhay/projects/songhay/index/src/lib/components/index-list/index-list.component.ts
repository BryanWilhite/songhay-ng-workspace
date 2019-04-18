import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { IndexOptions } from '../../models/index-options';
import { IndexRoutePaths } from '../../models/index-route-paths';
import { IndexFlowStyles } from '../../models/index-flow-styles';

import { IndexEntriesStore } from '../../services/index-entries.store';

/**
 * index list component
 *
 * @export
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rx-index-list',
    styleUrls: ['./index-list.component.scss'],
    templateUrl: './index-list.component.html'
})
export class IndexListComponent implements OnInit {
    /**
     * index reactive form group
     */
    indexFormGroup: FormGroup;

    /**
     * the current page of the index list
     */
    currentPage: number;

    /**
     * observable index
     */
    index$: Observable<Array<MenuDisplayItemModel>>;

    private filterIndexSubject: Subject<string>;

    /**
     * Creates an instance of AppIndexListComponent.
     */
    constructor(
        public indexOptions: IndexOptions,
        public sanitizer: DomSanitizer,
        private indexEntriesStore: IndexEntriesStore,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.filterIndexSubject = new Subject<string>();
    }

    /**
     * filters observable index
     */
    filterIndex(particle: string): void {
        this.filterIndexSubject.next(particle);
    }

    /**
     * implements @type {OnInit.ngOnInit}
     */
    ngOnInit(): void {
        this.initializeIndexFormGroup();
        this.initializeIndex();
        this.currentPage = 1;
    }

    navigateToGroups() {
        this.router.navigate(
            [IndexRoutePaths.root, IndexFlowStyles.Groups],
            { relativeTo: (this.route.parent || this.route) }
        );
    }

    private initializeIndex(): void {
        this.index$ = this.indexFormGroup.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            startWith(this.indexFormGroup.value as { indexFilter: string }),
            switchMap((i: { indexFilter: string }) =>
                this.indexEntriesStore.serviceData.pipe(
                    map(items => IndexEntriesStore.filterEntries(items, i.indexFilter))
                )
            )
        );
    }

    private initializeIndexFormGroup(): void {
        const defaultFilter = '';
        this.indexFormGroup = new FormGroup({
            indexFilter: new FormControl(defaultFilter)
        });
    }
}
