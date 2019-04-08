import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { AppDataStore } from '@songhay/core';

import { IndexOptions } from '../models/index-options';

/**
 * stores Index entries
 *
 * @export
 */
@Injectable()
export class IndexEntriesStore extends AppDataStore<MenuDisplayItemModel[], any> {
    /**
     * filters @type {MenuDisplayItemModel} entries
     *
     */
    static filterEntries(entries: MenuDisplayItemModel[], particle: string): MenuDisplayItemModel[] {
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
