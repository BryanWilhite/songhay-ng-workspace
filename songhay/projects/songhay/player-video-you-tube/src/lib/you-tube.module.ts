import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { YouTubeOptions } from './models/you-tube-options';
import { YouTubeRoutePaths } from './models/you-tube-route-paths';

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

const routes = [
    {
        path: `${YouTubeRoutePaths.root}/${YouTubeRoutePaths.presentation}`,
        component: YouTubePresentationComponent,
        pathMatch: 'full'
    },
    {
        path: `${YouTubeRoutePaths.root}/${YouTubeRoutePaths.presentationParameterized}`,
        component: YouTubePresentationComponent
    },
    {
        path: `${YouTubeRoutePaths.root}/${YouTubeRoutePaths.uploads}`,
        component: YouTubeThumbsSetComponent,
        pathMatch: 'full'
    },
    {
        path: `${YouTubeRoutePaths.root}/${YouTubeRoutePaths.uploadsParameterized}`,
        component: YouTubeThumbsSetComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes)
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
export class YouTubeModule {
    /**
     * injects providers into this root-level module
     *
     * @see https://angularfirst.com/the-ngmodule-forroot-convention/
     */
    static forRoot(options: YouTubeOptions): ModuleWithProviders<YouTubeModule> {
        return { ngModule: YouTubeModule, providers: [provideOptions(options)] };
    }
 }

/**
 * provider function
 *
 * @export
 * @see https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L158
 */
export function provideOptions(options: YouTubeOptions): {}[] {
    return [{ provide: YouTubeOptions, useValue: options }];
}
