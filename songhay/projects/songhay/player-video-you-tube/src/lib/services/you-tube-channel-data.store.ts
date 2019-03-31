import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';

import { YouTubeItem } from '../models/you-tube-item';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores YouTube Channel item data, curated by the Songhay studio.
 *
 * @export
 */
@Injectable()
export class YouTubeChannelDataStore extends AppDataStore<YouTubeItem[], any> {
    /**
     * gets @type {YouTubeItem[]}
     * from JSON of the shape { items: [] } }
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
     * gets the URI based on the specified @type {SendMethods}
     */
    static getUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiPlaylistPath
                }${id}`;
        }
    }

    /**
     * gets the @type {GenericWebPresentation} URI
     * based on the specified @type {SendMethods}
     */
    static getPresentationUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiVideosPath
                }${id}`;
        }
    }

    /**
     * returns @type {AppDataStoreOptions<YouTubeItem[], any>}
     * for this store
     */
    get options(): AppDataStoreOptions<YouTubeItem[], any> {
        const options = new AppDataStoreOptions<YouTubeItem[], any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return YouTubeChannelDataStore.getItems(data);
            }
        };
        return options;
    }
}
