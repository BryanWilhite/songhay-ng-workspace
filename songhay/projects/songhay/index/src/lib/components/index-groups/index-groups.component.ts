import { Observable } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap
} from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { DisplayItemUtility } from 'songhay/core/utilities/display-item.utility';

import { IndexFormGroup } from '../../models/index-form-group';
import { IndexOptions } from '../../models/index-options';

import { IndexEntriesStore } from '../../services/index-entries.store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rx-index-groups',
    templateUrl: './index-groups.component.html',
    styleUrls: ['./index-groups.component.scss']
})
export class IndexGroupsComponent implements OnInit {
    indexFormGroup: FormGroup;

    indexGroups$: Observable<MenuDisplayItemModel[]>;

    constructor(
        public indexEntriesStore: IndexEntriesStore,
        public indexOptions: IndexOptions,
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.initializeIndexFormGroup();
        this.initializeIndexGroups();
    }

    private initializeIndexFormGroup(): void {
        const defaultFilter = '';

        if (!this.indexOptions.indexGroupingOptions || !this.indexOptions.indexGroupingOptions.length) {
            throw new Error('The expected Index Grouping Options are not here.');
        }

        this.indexFormGroup = new FormGroup({
            indexGroupingSelection: new FormControl(
                this.indexOptions.indexGroupingOptions[0]
            ),
            indexFilter: new FormControl(defaultFilter)
        });
    }

    private initializeIndexGroups(): void {

        this.indexGroups$ = this.indexFormGroup.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            startWith(this.indexFormGroup.value as IndexFormGroup),
            switchMap((indexFormGroup: IndexFormGroup) =>
                this.indexEntriesStore.serviceData.pipe(
                    map(items =>
                        IndexEntriesStore.filterEntries(
                            items,
                            indexFormGroup.indexFilter
                        )
                    ),
                    map(items => DisplayItemUtility.displayInGroups(items,
                        indexFormGroup.indexGroupingSelection.groupId,
                        indexFormGroup.indexGroupingSelection.sortDescending))
                )
            )
        );
    }
}
