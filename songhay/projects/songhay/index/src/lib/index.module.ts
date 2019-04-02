import { NgModule, ModuleWithProviders } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';

import { IndexContainerComponent } from './components/index-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexEntriesStore } from './services/index-entries.store';
import { IndexOptions } from './models/index-options';

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
    declarations: [IndexContainerComponent],
    providers: [IndexEntriesStore],
    exports: [IndexContainerComponent, IndexEntriesStore]
})
export class IndexModule {
    static forOptions(options: IndexOptions): ModuleWithProviders<IndexModule> {
        return { ngModule: IndexModule, providers: [provideOptions(options)] };
    }
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
