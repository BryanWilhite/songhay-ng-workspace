import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

const routes: Routes = [
    { path: '', redirectTo: '/index/list', pathMatch: 'full' },
    { path: 'index/:style', component: AppIndexComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
