import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexModule, IndexCssOptionUtility, IndexOptions, IndexFlowStyles } from '@songhay/index';

import { MockDomainConverterUtility } from 'projects/songhay/index/src/lib/mocks/services/mock-domain-converter.utility';

const options: IndexOptions = {
    appDataStoreOptions: MockDomainConverterUtility.getAppDataStoreOptions(),
    defaultDisplayStyle: IndexFlowStyles.List,
    indexCssOptions: IndexCssOptionUtility.getDefaultOptions(),
    indexGroupingOptions: [
        { displayName: 'Group by Date', groupId: 'group-year-month-', sortDescending: true },
        { displayName: 'Group by Topic', groupId: 'topic-', sortDescending: false }
    ],
    indexStoreDataUri: 'assets/data/app-songhay-blog-q2-2018.json',
    indexStoreItemUri: 'blog/entry',
    indexStoreSpritesUri: 'assets/svg/sprites.svg'
};

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        IndexModule.forRoot(options)
    ],
    exports: [
        IndexModule
    ]
})
export class IndexLibModule { }
