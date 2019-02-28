import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { YouTubeLibModule } from './you-tube-lib.module';
import { YtComponent } from './components/yt/yt.component';

@NgModule({
  declarations: [
    AppComponent,
    YtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubeLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
