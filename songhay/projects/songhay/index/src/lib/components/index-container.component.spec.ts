import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndexOptions } from '../models/index-options';

import { MockDomainConverterUtility } from '../mocks/services/mock-domain-converter.utility';
import { IndexEntriesStore } from '../services/index-entries.store';

import { IndexContainerComponent } from './index-container.component';

const options: IndexOptions = new IndexOptions();
options.appDataStoreOptions = MockDomainConverterUtility.getAppDataStoreOptions();

describe(IndexContainerComponent.name, () => {
    let component: IndexContainerComponent;
    let fixture: ComponentFixture<IndexContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                IndexEntriesStore,
                { provide: IndexOptions, useValue: options }
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
