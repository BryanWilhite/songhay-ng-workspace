import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';
import { YouTubeChannelDataStore } from './you-tube-channel-data.store';
import { YouTubeItem } from '../models/you-tube-item';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores map of YouTube items for displaying sets of thumbnails by channel.
 *
 * @export
 * @class YouTubeChannelSetDataStore
 * @extends {AppDataStore<Map<string, YouTubeItem[]>, any>}
 */
@Injectable()
export class YouTubeChannelSetDataStore extends AppDataStore<
    Map<string, YouTubeItem[]>,
    any
> {
    /**
     * gets @type {Map<string, YouTubeItem[]>}
     * from JSON of the shape { set: [{ items: [] }] }
     *
     * @static
     * @param {{}} json
     * @returns {Map<string, YouTubeItem[]>}
     * @memberof YouTubeChannelSetDataStore
     */
    static getItemsMap(json: {}): Map<string, YouTubeItem[]> {
        const set = Array.from(json['set']).filter(i => {
            const test = i && i['items'];
            if (!test) {
                console.warn({
                    component: YouTubeChannelSetDataStore.name,
                    message: 'getItemsMap(): item filtered out',
                    itemFilteredOut: i
                });
            }
            return test;
        });
        return new Map(
            set.map(o => {
                const items = YouTubeChannelDataStore.getItems(o);
                const key = items[0].snippet.channelTitle;
                return [key, items] as [string, YouTubeItem[]];
            })
        );
    }

    /**
     * returns @type {AppDataStoreOptions<Map<string, YouTubeItem[]>, any>}
     * for this store
     *
     * @readonly
     * @static
     * @type {AppDataStoreOptions<Map<string, YouTubeItem[]>, any>}
     * @memberof YouTubeChannelSetDataStore
     */
    static getOptions(): AppDataStoreOptions<Map<string, YouTubeItem[]>, any> {
        const options: AppDataStoreOptions<Map<string, YouTubeItem[]>, any> = {
            domainConverter: (method, data) => {
                switch (method) {
                    default:
                    case 'get':
                        return YouTubeChannelSetDataStore.getItemsMap(data);
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
     * @param {string} [id]
     * @returns {string}
     * @memberof YouTubeChannelSetDataStore
     */
    static getUri(method: SendMethods, suffix?: string, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiPlaylistsPath
                }${suffix}/${id}`;
        }
    }
}
