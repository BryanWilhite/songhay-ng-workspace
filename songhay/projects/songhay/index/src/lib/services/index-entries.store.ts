import { Injectable } from '@angular/core';

import { DisplayItemModel } from 'songhay/core/models/display-item.model';

import { AppDataStore } from '@songhay/core';

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
}
