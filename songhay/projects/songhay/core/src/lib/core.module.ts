import { NgModule } from '@angular/core';

import { AppDataService } from './services/app-data.service';
import { AppDataStore } from './services/app-data.store';
import { AppDataStoreOptions } from './services/app-data-store.options';
import { DomSanitizerUtility } from './services/dom-sanitizer.utility';

@NgModule({
    providers: [
        AppDataService,
        AppDataStore,
        AppDataStoreOptions,
        DomSanitizerUtility
    ]
})
export class CoreModule { }
