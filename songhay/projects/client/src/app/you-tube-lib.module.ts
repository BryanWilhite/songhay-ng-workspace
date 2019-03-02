import { NgModule } from '@angular/core';
import { YouTubeModule } from '@songhay/player-video-you-tube';

@NgModule({
  imports: [
    YouTubeModule
  ],
  exports: [
    YouTubeModule
  ]
})
export class YouTubeLibModule { }
