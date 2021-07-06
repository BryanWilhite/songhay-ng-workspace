import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MockBlogEntryComponent } from './components/index-app/mock-blog.entry.component';

const routes: Routes = [
    { path: 'index-app/blog/entry/:id', component: MockBlogEntryComponent },
    {
        path: 'yt',
        loadChildren: () => import('./components/yt/you-tube-lib.module').then(m => m.YouTubeLibModule)
    },
    {
        path: 'index-app',
        loadChildren: () => import('./components/index-app/index-lib.module').then(m => m.IndexLibModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    declarations: [MockBlogEntryComponent],
    exports: [RouterModule]
})
export class AppRoutingModule { }
