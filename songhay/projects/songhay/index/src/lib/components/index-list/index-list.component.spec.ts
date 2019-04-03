import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexListComponent } from './index-list.component';

describe('IndexListComponent', () => {
    let component: IndexListComponent;
    let fixture: ComponentFixture<IndexListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
