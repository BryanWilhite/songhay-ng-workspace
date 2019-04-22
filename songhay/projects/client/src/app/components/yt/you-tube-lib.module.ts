import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule, YouTubeOptions, YouTubeCssOptionUtility, YouTubeModule } from '@songhay/player-video-you-tube';

import { ContainerComponent } from './container.component';

const options: YouTubeOptions = {
  youTubeCssOptions: YouTubeCssOptionUtility.getDefaultOptions(),
  youTubeSpritesUri: 'assets/svg/sprites.svg'
};

const routes: Routes = [
  { path: '', component: ContainerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    YouTubeModule.forRoot(options),
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: YouTubeOptions, useValue: options }
  ],
  declarations: [ContainerComponent],
  exports: [
    YouTubeModule
  ]
})
export class YouTubeLibModule { }
