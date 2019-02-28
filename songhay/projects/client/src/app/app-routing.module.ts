import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YtComponent } from './components/yt/yt.component';

const routes: Routes = [{ path: 'yt', component: YtComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
