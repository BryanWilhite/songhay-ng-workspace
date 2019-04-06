import { NgModule, ModuleWithProviders } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';

import { IndexOptions } from './models/index-options';

import { IndexEntriesStore } from './services/index-entries.store';

import { IndexContainerComponent } from './components/index-container.component';
import { IndexGroupsComponent } from './components/index-groups/index-groups.component';
import { IndexListComponent } from './components/index-list/index-list.component';
import { ErrorComponent } from './components/error/error.component';

/**
 * Index App Module
 *
 * @export
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        RoutingModule
    ],
    declarations: [
        IndexContainerComponent,
        IndexGroupsComponent,
        IndexListComponent,
        ErrorComponent
    ],
    exports: [IndexContainerComponent]
})
export class IndexModule {
    /**
     * injects providers into this root-level module
     *
     * @see https://angularfirst.com/the-ngmodule-forroot-convention/
     */
    static forRoot(options: IndexOptions, dataStore?: IndexEntriesStore): ModuleWithProviders<IndexModule> {
        return !dataStore ?
            { ngModule: IndexModule, providers: [provideOptions(options), IndexEntriesStore] }
            :
            { ngModule: IndexModule, providers: [provideOptions(options), provideEntriesStore(dataStore)] };
    }
}


/**
 * provider function
 *
 * @export
 */
export function provideEntriesStore(dataStore: IndexEntriesStore): {}[] {
    return [{ provide: IndexEntriesStore, useValue: dataStore }];
}

/**
 * provider function
 *
 * @export
 * @see https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L158
 */
export function provideOptions(options: IndexOptions): {}[] {
    return [{ provide: IndexOptions, useValue: options }];
}
