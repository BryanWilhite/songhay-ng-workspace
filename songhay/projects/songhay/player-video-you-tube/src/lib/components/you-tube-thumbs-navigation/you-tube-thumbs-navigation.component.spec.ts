import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeOptions } from '../../models/you-tube-options';
import { YouTubeChannelsIndexDataStore } from '../../services/you-tube-channels-index-data.store';
import { YouTubeCssOptionUtility } from '../../utilities/you-tube-css-option.utility';

import { YouTubeThumbsNavigationComponent } from './you-tube-thumbs-navigation.component';

const options: YouTubeOptions = {
    youTubeCssOptions: YouTubeCssOptionUtility.getDefaultOptions(),
    youTubeSpritesUri: 'sprites.svg'
};

describe(YouTubeThumbsNavigationComponent.name, () => {
    let component: YouTubeThumbsNavigationComponent;
    let fixture: ComponentFixture<YouTubeThumbsNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [YouTubeThumbsNavigationComponent],
            providers: [
                { provide: YouTubeOptions, useValue: options },
                YouTubeChannelsIndexDataStore
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YouTubeThumbsNavigationComponent);
        component = fixture.componentInstance;

        component.channelsIndexName = 'songhay';
        component.channelTitle = 'channel title';
        component.channels = null;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
