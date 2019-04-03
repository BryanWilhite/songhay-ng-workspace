import * as lodash_ from 'lodash';
const _ = lodash_;

import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap
} from 'rxjs/operators';

import { DisplayItemModel } from 'songhay/core/models/display-item.model';

import { IndexFormGroup } from '../../models/index-form-group';
import { IndexGroup } from '../../models/index-group';
import { IndexGroupingOption } from '../../models/index-grouping-option';
import { IndexOptions } from '../../models/index-options';

import { IndexEntriesStore } from '../../services/index-entries.store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rx-index-list',
    templateUrl: './index-list.component.html',
    styleUrls: ['./index-list.component.scss']
})
export class IndexListComponent implements OnInit {
    indexFormGroup: FormGroup;

    indexGroupingOptions: IndexGroupingOption[];

    indexGroups$: Observable<IndexGroup[]>;

    constructor(
        public indexEntriesStore: IndexEntriesStore,
        public indexOptions: IndexOptions,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.initializeIndexGroupingOptions();
        this.initializeIndexFormGroup();
        this.initializeIndexGroups();
    }

    private initializeIndexGroups(): void {
        const chainIntoGroups = (
            entries: DisplayItemModel[],
            indexGroupingOption: IndexGroupingOption
        ) => {
            return _(entries)
                .chain()
                .groupBy((i: DisplayItemModel) => i.itemCategory)
                .map((items: DisplayItemModel[]) => {
                    if (!items || !items.length) {
                        console.log(
                            'The expected group of Blog entries are not here.'
                        );
                        return;
                    }
                    const firstEntry = items[0];
                    const groupDisplayName = firstEntry.itemCategory;
                    const indexGroup: IndexGroup = {
                        group: items,
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
            switchMap((indexFormGroup: IndexFormGroup) =>
                this.indexEntriesStore.serviceData.pipe(
                    map(items => IndexEntriesStore.filterEntries(items, indexFormGroup.indexFilter)),
                    map(items => chainIntoGroups(items, indexFormGroup.indexGroupingSelection))
                )
            )
        );
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
