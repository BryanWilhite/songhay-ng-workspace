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
import { IndexGroupsComponent } from './index-groups.component';

describe(IndexGroupsComponent.name, () => {
    let component: IndexGroupsComponent;
    let fixture: ComponentFixture<IndexGroupsComponent>;

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
            declarations: [IndexGroupsComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexGroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
