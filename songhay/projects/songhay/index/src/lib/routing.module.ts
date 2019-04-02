import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexContainerComponent } from './components/index-container.component';

const routes: Routes = [
    { path: 'index/:style', component: IndexContainerComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
