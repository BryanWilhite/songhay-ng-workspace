import { AppDataStore, AppDataStoreOptions } from '@songhay/core';
import { YouTubeItem, YouTubeScalars } from '@songhay/player-video-you-tube';
import { SendMethods } from 'projects/songhay/core/src/public_api';

/**
 * Stores YouTube Channel item data, curated by the Songhay studio.
 *
 * @export
 * @class YouTubeItemDataStore
 * @extends {AppDataStore<YouTubeItem[], any>}
 */
export class YouTubeItemDataStore extends AppDataStore<YouTubeItem[], any> {
    /**
     * returns @type {AppDataStoreOptions<YouTubeItem[], any>}
     * for this store
     *
     * @readonly
     * @static
     * @type {AppDataStoreOptions<YouTubeItem[], any>}
     * @memberof YouTubeItemDataStore
     */
    static get options(): AppDataStoreOptions<YouTubeItem[], any> {
        return {
            domainConverter: (method, data) => {
                switch (method) {
                    default:
                    case 'get':
                        return YouTubeItemDataStore.getItems(data);
                }
            }
        };
    }

    /**
     * gets @type {YouTubeItem[]}
     * from JSON of the shape { items: [] } }
     *
     * @static
     * @param {{}} json
     * @returns {YouTubeItem[]}
     * @memberof YouTubeDataService
     */
    static getItems(json: {}): YouTubeItem[] {
        const items = json['items'] as YouTubeItem[];
        return items;
    }

    /**
     * gets the URI based on the specified @type {SendMethods}
     *
     * @static
     * @param {SendMethods} method
     * @param {string} [channelId]
     * @returns {string}
     * @memberof YouTubeItemDataStore
     */
    static getUri(method: SendMethods, channelId?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiPlaylistPath
                }${channelId}`;
        }
    }
}
