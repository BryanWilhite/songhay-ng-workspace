import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeOptions } from '../../models/you-tube-options';
import { YouTubeCssOptionUtility } from '../../utilities/you-tube-css-option.utility';

import { YouTubeThumbsComponent } from './you-tube-thumbs.component';

const options: YouTubeOptions = {
    youTubeCssOptions: YouTubeCssOptionUtility.getDefaultOptions(),
    youTubeSpritesUri: 'sprites.svg'
};

describe(YouTubeThumbsComponent.name, () => {
    const animationBuilder = jasmine.createSpyObj(AnimationBuilder.name, [
        'build'
    ]);
    let component: YouTubeThumbsComponent;
    let fixture: ComponentFixture<YouTubeThumbsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YouTubeThumbsComponent],
            providers: [
                { provide: YouTubeOptions, useValue: options },
                { provide: AnimationBuilder, useValue: animationBuilder }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YouTubeThumbsComponent);
        component = fixture.componentInstance;

        component.disableDefaultSort = false;
        component.thumbsAnimationDuration = 500;
        component.thumbsHeaderLevel = 1;
        component.thumbsTitle = 'thumbs title';
        component.youTubeItems = null;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
