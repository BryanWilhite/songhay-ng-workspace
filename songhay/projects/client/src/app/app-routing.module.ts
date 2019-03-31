import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YouTubeRoutePaths } from '@songhay/player-video-you-tube';

const routes: Routes = [
    { path: 'yt', loadChildren: './components/yt/yt.module#YtModule' },
    {
        path: `${YouTubeRoutePaths.root}${YouTubeRoutePaths.uploads}`,
        loadChildren:
            './components/yt/module/you-tube-lib.module#YouTubeLibModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
