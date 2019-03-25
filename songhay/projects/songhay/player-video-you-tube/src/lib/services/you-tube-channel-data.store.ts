import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
     * gets @type {YouTubeItem[]}
     * from JSON of the shape { items: [] } }
     *
     * @static
     * @param {{ items: {} }} json
     * @returns {YouTubeItem[]}
     * @memberof YouTubeChannelDataStore
     */
    static getItems(json: {}): YouTubeItem[] {
        const data = json as { items: {} };
        if (!data) {
            throw Error('The expected YouTubeItem[] data shape is not here.');
        }
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
    static getOptions(): AppDataStoreOptions<YouTubeItem[], any> {
        const options: AppDataStoreOptions<YouTubeItem[], any> = {
            domainConverter: (method, data) => {
                switch (method) {
                    default:
                    case 'get':
                        return YouTubeChannelDataStore.getItems(data);
                }
            }
        };

        return options;
    }

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
     * Creates an instance of @type {YouTubeChannelDataStore}.
     * @param {Injector} injector
     * @memberof YouTubeChannelDataStore
     */
    constructor(injector: Injector) {
        super(injector.get(HttpClient), YouTubeChannelDataStore.getOptions());
    }
}
