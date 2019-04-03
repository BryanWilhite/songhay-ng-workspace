import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndexOptions } from '../../models/index-options';
import { IndexStyles } from '../../models/index-styles';
import { IndexEntriesStore } from '../../services/index-entries.store';
import { IndexListComponent } from './index-list.component';

describe(IndexListComponent.name, () => {
    let component: IndexListComponent;
    let fixture: ComponentFixture<IndexListComponent>;

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
            declarations: [IndexListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
