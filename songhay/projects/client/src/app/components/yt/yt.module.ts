import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    MaterialModule,
    YouTubeModule,
    YouTubeRoutePaths
} from '@songhay/player-video-you-tube';

import { IndexComponent } from './index.component';
import { ThumbsComponent } from './thumbs/thumbs.component';

const routes: Routes = [
    { path: 'index', component: IndexComponent },
    {
        path: `lib/${YouTubeRoutePaths.uploads}`,
        loadChildren: './module/you-tube-lib.module#YouTubeLibModule'
    },
    { path: 'thumbs', component: ThumbsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        YouTubeModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent, ThumbsComponent]
})
export class YtModule {}
