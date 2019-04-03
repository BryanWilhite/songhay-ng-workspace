import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndexOptions } from '../models/index-options';
import { IndexStyles } from '../models/index-styles';
import { IndexEntriesStore } from '../services/index-entries.store';
import { IndexContainerComponent } from './index-container.component';

describe(IndexContainerComponent.name, () => {
    let component: IndexContainerComponent;
    let fixture: ComponentFixture<IndexContainerComponent>;

    const options: IndexOptions = {
        defaultDisplayStyle: IndexStyles.Groups,
        indexRouterLink: [],
        indexStoreUri: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                { provide: IndexOptions, useValue: options },
                IndexEntriesStore
            ],
            declarations: [IndexContainerComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
