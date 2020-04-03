import { NgModule } from '@angular/core';

import { AppDataStore } from './services/app-data.store';
import { AppDataStoreOptions } from './services/app-data-store.options';
import { DomSanitizerUtility } from './services/dom-sanitizer.utility';

@NgModule({
    providers: [
        AppDataStore,
        AppDataStoreOptions,
        DomSanitizerUtility
    ]
})
export class CoreModule { }
