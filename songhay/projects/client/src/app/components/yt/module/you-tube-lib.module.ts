import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  MaterialModule,
  YouTubeModule
} from '@songhay/player-video-you-tube';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    YouTubeModule
],
  exports: [
    YouTubeModule
  ]
})
export class YouTubeLibModule { }
