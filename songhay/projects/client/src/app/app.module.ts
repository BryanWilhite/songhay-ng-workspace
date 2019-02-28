import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { YouTubeLibModule } from './you-tube-lib.module';

@NgModule({
  declarations: [
    AppComponent
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
