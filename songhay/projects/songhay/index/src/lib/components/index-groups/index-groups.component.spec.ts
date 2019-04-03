import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGroupsComponent } from './index-groups.component';

describe('IndexGroupsComponent', () => {
    let component: IndexGroupsComponent;
    let fixture: ComponentFixture<IndexGroupsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
