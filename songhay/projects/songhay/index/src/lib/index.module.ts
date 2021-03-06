import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { IndexOptions } from './models/index-options';
import { IndexRoutePaths } from './models/index-route-paths';

import { IndexEntriesStore } from './services/index-entries.store';

import { IndexContainerComponent } from './components/index-container.component';
import { IndexGroupsComponent } from './components/index-groups/index-groups.component';
import { IndexListComponent } from './components/index-list/index-list.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
    { path: '', component: IndexContainerComponent, pathMatch: 'full' },
    { path: IndexRoutePaths.rootParameterized, component: IndexContainerComponent }
];

/**
 * Index App Module
 *
 * @export
 */
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [IndexEntriesStore],
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
    static forRoot(options: IndexOptions): ModuleWithProviders<IndexModule> {
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
