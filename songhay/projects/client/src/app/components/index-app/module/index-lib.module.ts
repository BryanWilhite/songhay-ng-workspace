import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexModule, IndexOptions, IndexStyles } from '@songhay/index';

import { MockDomainConverterUtility } from 'projects/songhay/index/src/lib/mocks/services/mock-domain-converter.utility';

const options: IndexOptions = {
    appDataStoreOptions: MockDomainConverterUtility.getAppDataStoreOptions(),
    defaultDisplayStyle: IndexStyles.List,
    indexGroupingOptions: [
        { displayName: 'Group by Date', groupId: 'group-year-month-', sortDescending: true },
        { displayName: 'Group by Topic', groupId: 'topic-', sortDescending: false }
    ],
    indexStoreDataUri: 'assets/index/data/app-songhay-blog-q2-2018.json',
    indexStoreItemUri: 'blog/entry',
    indexStoreSpritesUri: 'assets/svg/sprites.svg'
};

@NgModule({
    imports: [
        CommonModule,
        IndexModule.forRoot(options)
    ],
    exports: [
        IndexModule
    ]
})
export class IndexLibModule { }
