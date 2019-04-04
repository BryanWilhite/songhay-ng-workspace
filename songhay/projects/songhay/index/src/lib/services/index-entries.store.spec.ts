import { TestBed, inject, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { BlogEntry } from '../mocks/models/mock.models';

import { IndexEntriesStore } from './index-entries.store';

describe(IndexEntriesStore.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject(
        [IndexEntriesStore],
        (service: IndexEntriesStore) => {
            expect(service).toBeTruthy();
        }
    ));
});
