import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';
import { YouTubeChannelDataStore } from './you-tube-channel-data.store';
import { YouTubeItem } from '../models/you-tube-item';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores map of YouTube items for displaying sets of thumbnails by channel.
 *
 * @export
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
     */
    static getItemsMap(json: {}): Map<string, YouTubeItem[]> {
        const data = json as { set: [] };
        if (!data) {
            throw Error('The expected YouTubeItem[] data shape is not here.');
        }
        const set = Array.from(data.set).filter(i => {
            const datum = i as { items: [] };
            return !datum ? false : true;
        });
        if (!set || !set.length) {
            throw Error('The expected YouTubeItem[] data mapping is not here.');
        }
        return new Map(
            set.map(o => {
                const items = YouTubeChannelDataStore.getItems(o);
                const key = items[0].snippet.channelTitle;
                return [key, items] as [string, YouTubeItem[]];
            })
        );
    }

    /**
     * gets the URI based on the specified @type {SendMethods}
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

    /**
     * returns @type {AppDataStoreOptions<Map<string, YouTubeItem[]>, any>}
     * for this store
     */
    get options(): AppDataStoreOptions<Map<string, YouTubeItem[]>, any> {
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
}
