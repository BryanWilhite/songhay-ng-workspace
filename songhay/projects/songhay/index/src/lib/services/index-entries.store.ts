import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DisplayItemModel } from 'songhay/core/models/display-item.model';
import { AppDataStore, AppDataStoreOptions } from '@songhay/core';

import { IndexOptions } from '../models/index-options';

/**
 * stores Index entries
 *
 * @export
 */
@Injectable()
export class IndexEntriesStore extends AppDataStore<DisplayItemModel[], any> {
    /**
     * filters @type {DisplayItemModel} entries
     *
     */
    static filterEntries(entries: DisplayItemModel[], particle: string): DisplayItemModel[] {
        const contains = (needle: string, haystack: string) => {
            return (
                needle &&
                haystack &&
                haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1
            );
        };
        if (!particle) {
            return entries;
        }
        if (particle.length < 2) {
            return entries;
        }
        return entries.filter(i => contains(particle, i.displayText));
    }

    /**
     * Creates an instance of IndexEntriesStore.
     */
    constructor(client: HttpClient, private indexOptions: IndexOptions) {
        super(client);

        if (!this.indexOptions) {
            throw Error('The expected IndexOptions are not here.');
        }
        if (!this.indexOptions.appDataStoreOptions) {
            throw Error('The expected AppDataStoreOptions for this Index Store are not here.');
        }

        this.options = this.indexOptions.appDataStoreOptions;
    }
}
