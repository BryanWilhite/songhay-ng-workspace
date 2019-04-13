import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { MathUtility } from 'songhay/core/utilities/math.utility';

import * as app from '../../mocks/data/app-songhay-blog-q2-2018.json';
import { IndexOptions } from '../../models/index-options';

import { MockDomainConverterUtility } from '../../mocks/services/mock-domain-converter.utility';
import { IndexEntriesStore } from '../../services/index-entries.store';

import { IndexGroupsComponent } from './index-groups.component';

const options: IndexOptions = new IndexOptions();
options.appDataStoreOptions = MockDomainConverterUtility.getAppDataStoreOptions();
options.indexGroupingOptions = [
    { displayName: 'Group by Date', groupId: 'group-year-month-', sortDescending: true },
    { displayName: 'Group by Topic', groupId: 'topic-', sortDescending: false }
];

describe(IndexGroupsComponent.name, () => {
    let component: IndexGroupsComponent;
    let fixture: ComponentFixture<IndexGroupsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
                MaterialModule
            ],
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

    it('should instantiate', () => {
        expect(component).toBeTruthy();
    });

    it('should display accordion headers', async(() => {
        const endpoint = './api/mock';

        const service = TestBed.get(IndexEntriesStore) as IndexEntriesStore;
        expect(service).toBeTruthy();

        const controller = TestBed.get(HttpTestingController) as HttpTestingController;
        expect(controller).toBeTruthy();

        service.load(endpoint);
        const control: TestRequest = controller.expectOne(endpoint);
        control.flush({ index: app.index });

        fixture.detectChanges();

        let subRan = false;
        const sub = component.indexGroups$.subscribe(groups => {
            subRan = true;

            expect(groups).toBeTruthy();
            expect(groups.length).toBeGreaterThan(1);

            const container = fixture.debugElement.query(By.css('.mat-accordion'));
            expect(container).toBeTruthy();

            const children = container.queryAll(By.css('.mat-expansion-panel'));
            expect(children).toBeTruthy();
            expect(children.length).toEqual(groups.length);
            console.log(`${IndexGroupsComponent.name}: found ${children.length} Material expansion panels.`);

            const i = MathUtility.getRandom(0, children.length - 1);

            const child = children[i];
            expect(child).toBeTruthy();

            const childDatum = groups[i];
            expect(childDatum).toBeTruthy();

            const header = child.query(By.css('h2'));
            expect(header).toBeTruthy();

            const h2 = header.nativeElement as HTMLHeadingElement;
            expect(h2).toBeTruthy();
            expect(h2.id).toEqual(childDatum.id as string);
            expect(h2.innerHTML).toEqual(childDatum.displayText);

            console.log(IndexGroupsComponent.name, { child, childDatum, h2 });
        });

        fixture.whenStable().then(() => {
            sub.unsubscribe();
            expect(subRan).toEqual(true);
        });
    }));
});
