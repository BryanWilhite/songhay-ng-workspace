import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    YouTubeChannelDataStore,
    MaterialModule,
    YouTubeThumbsComponent
} from '@songhay/player-video-you-tube';

import { IndexComponent } from './index.component';
import { ThumbsComponent } from './thumbs/thumbs.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'thumbs', component: ThumbsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    providers: [YouTubeChannelDataStore],
    declarations: [YouTubeThumbsComponent, IndexComponent, ThumbsComponent]
})
export class YtModule {}
