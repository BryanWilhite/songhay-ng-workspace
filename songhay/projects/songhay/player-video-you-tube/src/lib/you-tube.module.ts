import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { YouTubeChannelDataStore } from './services/you-tube-channel-data.store';
import { YouTubeChannelSetDataStore } from './services/you-tube-channel-set-data.store';
import { YouTubeChannelsIndexDataStore } from './services/you-tube-channels-index-data.store';
import { YouTubePresentationDataStore } from './services/you-tube-presentation-data.store';
import { YouTubeDataService } from './services/you-tube-data.service';
import { YouTubePresentationDataServices } from './services/you-tube-presentation-data.services';

import { YouTubePresentationComponent } from './components/you-tube-presentation/you-tube-presentation.component';
import { YouTubeThumbsComponent } from './components/you-tube-thumbs/you-tube-thumbs.component';
import { YouTubeThumbsNavigationComponent } from './components/you-tube-thumbs-navigation/you-tube-thumbs-navigation.component';
import { YouTubeThumbsSetComponent } from './components/you-tube-thumbs-set/you-tube-thumbs-set.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild([{ path: '', component: YouTubeThumbsSetComponent }])
    ],
    declarations: [
        YouTubePresentationComponent,
        YouTubeThumbsComponent,
        YouTubeThumbsNavigationComponent,
        YouTubeThumbsSetComponent
    ],
    providers: [
        YouTubeChannelDataStore,
        YouTubeChannelSetDataStore,
        YouTubeChannelsIndexDataStore,
        YouTubePresentationDataStore,
        YouTubeDataService,
        YouTubePresentationDataServices
    ],
    exports: [
        YouTubePresentationComponent,
        YouTubeThumbsComponent,
        YouTubeThumbsNavigationComponent,
        YouTubeThumbsSetComponent
    ]
})
export class YouTubeModule { }
