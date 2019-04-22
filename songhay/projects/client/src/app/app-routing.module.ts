import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YouTubeRoutePaths } from '@songhay/player-video-you-tube';
import { MockBlogEntryComponent } from './components/index-app/mock-blog.entry.component';

const routes: Routes = [
    { path: 'index-app/blog/entry/:id', component: MockBlogEntryComponent },
    {
        path: 'yt',
        loadChildren: './components/yt/you-tube-lib.module#YouTubeLibModule'
    },
    {
        path: `${YouTubeRoutePaths.root}${YouTubeRoutePaths.uploads}`,
        loadChildren: './components/yt/you-tube-lib.module#YouTubeLibModule'
    },
    {
        path: 'index-app',
        loadChildren: './components/index-app/index-lib.module#IndexLibModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [MockBlogEntryComponent],
    exports: [RouterModule]
})
export class AppRoutingModule { }
