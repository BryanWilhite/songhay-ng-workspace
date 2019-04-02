import * as _ from 'lodash';
import { Observable, of } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap
} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { DisplayItemModel } from 'songhay/core/models/display-item.model';

import { IndexFormGroup } from '../../models/index-form-group';
import { IndexGroupingOption } from '../../models/index-grouping-option';
import { IndexGroup } from '../../models/index-group';

import { IndexEntriesStore } from '../../services/index-entries.store';

@Component({
    selector: 'rx-index-groups',
    templateUrl: './index-groups.component.html',
    styleUrls: ['./index-groups.component.scss']
})
export class IndexGroupsComponent implements OnInit {
    indexFormGroup: FormGroup;

    indexGroupingOptions: IndexGroupingOption[];

    indexGroups$: Observable<IndexGroup[]>;

    constructor(
        public indexEntriesStore: IndexEntriesStore,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.initializeIndexGroupingOptions();
        this.initializeIndexFormGroup();
        this.initializeIndexGroups();
    }

    private initializeIndexFormGroup(): void {
        const defaultFilter = '';
        this.indexFormGroup = new FormGroup({
            indexGroupingSelection: new FormControl(
                this.indexGroupingOptions[0]
            ),
            indexFilter: new FormControl(defaultFilter)
        });
    }

    private initializeIndexGroups(): void {
        const chainIntoGroups = (
            entries: DisplayItemModel[],
            indexGroupingOption: IndexGroupingOption
        ) => {
            return _(entries)
                .chain()
                .groupBy((i: DisplayItemModel) =>
                    _.toString(
                        i.itemCategoryObject[
                            indexGroupingOption.groupByPropertyName
                        ]
                    )
                )
                .map((i: DisplayItemModel[]) => {
                    if (!i || !i.length) {
                        console.log(
                            'The expected group of Blog entries are not here.'
                        );
                        return;
                    }
                    const firstEntry = i[0];
                    const groupDisplayName =
                        firstEntry.itemCategoryObject[
                            indexGroupingOption.groupByPropertyName
                        ];
                    const indexGroup: IndexGroup = {
                        group: i,
                        groupDisplayName: this.sanitizer.bypassSecurityTrustHtml(
                            groupDisplayName
                        ),
                        isCollapsed: false
                    };
                    return indexGroup;
                })
                .orderBy(
                    ['groupDisplayName'],
                    [indexGroupingOption.sortDescending ? 'desc' : 'asc']
                )
                .value();
        };

        this.indexGroups$ = this.indexFormGroup.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            startWith(this.indexFormGroup.value as IndexFormGroup),
            switchMap((i: IndexFormGroup) =>
                of(this.indexEntriesStore.load).pipe(
                    map(j => IndexEntriesStore.filterEntries(j, i.indexFilter)),
                    map(j => chainIntoGroups(j, i.indexGroupingSelection))
                )
            )
        );
    }

    private initializeIndexGroupingOptions(): void {
        this.indexGroupingOptions = [
            {
                displayName: 'by Date',
                groupByPropertyName: 'dateGroup',
                sortDescending: true
            },
            {
                displayName: 'by Topic',
                groupByPropertyName: 'topic',
                sortDescending: false
            }
        ];
    }
}
