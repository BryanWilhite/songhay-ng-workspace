import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeChannelsIndexDataStore } from '../../services/you-tube-channels-index-data.store';
import { YouTubeThumbsNavigationComponent } from './you-tube-thumbs-navigation.component';

describe(YouTubeThumbsNavigationComponent.name, () => {
    let component: YouTubeThumbsNavigationComponent;
    let fixture: ComponentFixture<YouTubeThumbsNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [YouTubeThumbsNavigationComponent],
            providers: [YouTubeChannelsIndexDataStore],
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
