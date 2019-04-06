import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexModule, IndexOptions, IndexStyles } from '@songhay/index';

import { MockDomainConverterUtility } from 'projects/songhay/index/src/lib/mocks/services/mock-domain-converter.utility';

const options: IndexOptions = {
    appDataStoreOptions: MockDomainConverterUtility.getAppDataStoreOptions(),
    defaultDisplayStyle: IndexStyles.List,
    indexRouterLink: [],
    indexStoreUri: ''
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
