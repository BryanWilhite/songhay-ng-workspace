import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';

import { YouTubeItem } from '../models/you-tube-item';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores YouTube Channel item data, curated by the Songhay studio.
 *
 * @export
 * @class YouTubeChannelDataStore
 * @extends {AppDataStore<YouTubeItem[], any>}
 */
@Injectable()
export class YouTubeChannelDataStore extends AppDataStore<YouTubeItem[], any> {
    /**
     * gets the URI based on the specified @type {SendMethods}
     *
     * @static
     * @param {SendMethods} method
     * @param {string} [suffix]
     * @returns {string}
     * @memberof YouTubeChannelDataStore
     */
    static getUri(method: SendMethods, suffix?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiPlaylistsIndexPath
                }${suffix}`;
        }
    }

    /**
     * gets @type {YouTubeItem[]}
     * from JSON of the shape { items: [] } }
     *
     * @static
     * @param {{ items: {} }} json
     * @returns {YouTubeItem[]}
     * @memberof YouTubeChannelDataStore
     */
    getItems(json: {}): YouTubeItem[] {
        const data = json as { items: {} };
        if (!data) {
            throw Error('The expected YouTubeItem[] data shape is not here.');
        }
        console.log('yip', data);
        const items = data.items as YouTubeItem[];
        if (!items) {
            throw Error('The expected YouTubeItem[] data is not here.');
        }
        return items;
    }

    /**
     * returns @type {AppDataStoreOptions<YouTubeItem[], any>}
     * for this store
     *
     * @readonly
     * @static
     * @type {AppDataStoreOptions<YouTubeItem[], any>}
     * @memberof YouTubeChannelDataStore
     */
    get options(): AppDataStoreOptions<YouTubeItem[], any> {
        const options = new AppDataStoreOptions<YouTubeItem[], any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return this.getItems(data);
            }
        };
        return options;
    }
}
