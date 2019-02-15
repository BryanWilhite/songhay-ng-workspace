import { NgModule } from '@angular/core';

import { AppDataService } from './services/app-data.service';
import { DomSanitizerUtility } from './services/dom-sanitizer.utility';

@NgModule({
    providers: [AppDataService, DomSanitizerUtility]
})
export class CoreModule { }
