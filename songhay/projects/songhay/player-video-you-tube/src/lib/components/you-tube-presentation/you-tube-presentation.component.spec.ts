import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeChannelDataStore } from '../../services/you-tube-channel-data.store';
import { YouTubeChannelsPresentationDataStore } from '../../services/you-tube-channels-presentation-data.store';
import { YouTubePresentationComponent } from './you-tube-presentation.component';

describe(YouTubePresentationComponent.name, () => {
    let component: YouTubePresentationComponent;
    let fixture: ComponentFixture<YouTubePresentationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [YouTubePresentationComponent],
            providers: [
                YouTubeChannelDataStore,
                YouTubeChannelsPresentationDataStore
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YouTubePresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
