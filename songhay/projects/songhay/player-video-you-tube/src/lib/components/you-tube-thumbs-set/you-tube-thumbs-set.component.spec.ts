import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeChannelSetDataStore } from '../../services/you-tube-channel-set-data.store';
import { YouTubeThumbsSetComponent } from './you-tube-thumbs-set.component';

describe(YouTubeThumbsSetComponent.name, () => {
    let component: YouTubeThumbsSetComponent;
    let fixture: ComponentFixture<YouTubeThumbsSetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [YouTubeThumbsSetComponent],
            providers: [YouTubeChannelSetDataStore],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YouTubeThumbsSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
