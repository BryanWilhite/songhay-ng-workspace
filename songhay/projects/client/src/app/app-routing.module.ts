import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexRoutePaths } from '@songhay/index';
import { YouTubeRoutePaths } from '@songhay/player-video-you-tube';

const routes: Routes = [
    { path: 'yt', loadChildren: './components/yt/yt.module#YtModule' },
    {
        path: `${YouTubeRoutePaths.root}${YouTubeRoutePaths.uploads}`,
        loadChildren: './components/yt/module/you-tube-lib.module#YouTubeLibModule'
    },
    { path: 'index-app', loadChildren: './components/index-app/module/index-lib.module#IndexLibModule' },
    { path: IndexRoutePaths.root, loadChildren: './components/index-app/module/index-lib.module#IndexLibModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
