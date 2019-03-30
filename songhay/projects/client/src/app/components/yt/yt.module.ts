import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeLibModule } from './you-tube-lib.module';

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
        RouterModule.forChild(routes),
        YouTubeLibModule
    ],
    declarations: [IndexComponent, ThumbsComponent]
})
export class YtModule {}
