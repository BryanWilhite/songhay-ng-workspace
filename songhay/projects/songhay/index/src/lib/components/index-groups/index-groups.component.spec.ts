import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndexOptions } from '../../models/index-options';

import { MockDomainConverterUtility } from '../../mocks/services/mock-domain-converter.utility';
import { IndexEntriesStore } from '../../services/index-entries.store';

import { IndexGroupsComponent } from './index-groups.component';

const options: IndexOptions = new IndexOptions();
options.appDataStoreOptions = MockDomainConverterUtility.getAppDataStoreOptions();

describe(IndexGroupsComponent.name, () => {
    let component: IndexGroupsComponent;
    let fixture: ComponentFixture<IndexGroupsComponent>;

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
