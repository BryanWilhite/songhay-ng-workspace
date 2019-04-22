import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule, YouTubeOptions, YouTubeCssOptionUtility, YouTubeModule } from '@songhay/player-video-you-tube';

const options: YouTubeOptions = {
  youTubeCssOptions: YouTubeCssOptionUtility.getDefaultOptions(),
  youTubeSpritesUri: 'assets/svg/sprites.svg'
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    YouTubeModule.forRoot(options)
  ],
  exports: [
    YouTubeModule
  ]
})
export class YouTubeLibModule { }
