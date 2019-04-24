import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeOptions } from '../../models/you-tube-options';
import { YouTubeChannelSetDataStore } from '../../services/you-tube-channel-set-data.store';
import { YouTubeCssOptionUtility } from '../../utilities/you-tube-css-option.utility';

import { YouTubeThumbsSetComponent } from './you-tube-thumbs-set.component';

const options: YouTubeOptions = {
    youTubeCssOptions: YouTubeCssOptionUtility.getDefaultOptions(),
    youTubeSpritesUri: 'sprites.svg'
};

describe(YouTubeThumbsSetComponent.name, () => {
    let component: YouTubeThumbsSetComponent;
    let fixture: ComponentFixture<YouTubeThumbsSetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [YouTubeThumbsSetComponent],
            providers: [
                { provide: YouTubeOptions, useValue: options },
                YouTubeChannelSetDataStore
            ],
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
