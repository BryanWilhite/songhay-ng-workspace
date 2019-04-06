import { Injectable, Injector } from '@angular/core';
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
    private indexOptions: IndexOptions;

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
     * Creates an instance of @type {IndexEntriesStore}.
     */
    constructor(private injector: Injector) {
        super(injector.get(HttpClient));

        this.indexOptions = injector.get(IndexOptions);
    }

    /**
     * The expected @type {AppDataStoreOptions<DisplayItemModel[], any>}
     * for this Index Store.
     */
    get options(): AppDataStoreOptions<DisplayItemModel[], any> {
        if (!this.indexOptions.appDataStoreOptions) {
            throw Error('The expected AppDataStoreOptions for this Index Store is not here.');
        }
        return this.indexOptions.appDataStoreOptions;
    }
}
