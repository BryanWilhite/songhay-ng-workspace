import { ObjectUtility } from 'songhay/core/utilities/object.utility';
import { Injectable } from '@angular/core';
import { AppDataStore, SendMethods, AppDataStoreOptions } from '@songhay/core';
import { GenericWebIndex } from '../models/generic-web-index';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores YouTube Channel index data, curated by the Songhay studio.
 *
 * @export
 */
@Injectable()
export class YouTubeChannelsIndexDataStore extends AppDataStore<
    GenericWebIndex,
    any
> {
    /**
     * gets @type {GenericWebIndex}
     * from JSON of the shape {} }
     */
    static getGenericWebIndex(json: {}): GenericWebIndex {
        const data = ObjectUtility.lowerCasePropertyChar(json);
        const index = data as GenericWebIndex;
        if (!index) {
            throw new Error('The expected GenericWebIndex is not here.');
        }
        return index;
    }

    /**
     * gets the URI based on the specified @type {SendMethods}
     */
    static getUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiPlaylistsIndexPath
                }${id}`;
        }
    }

    /**
     * returns @type {AppDataStoreOptions<GenericWebIndex, any>}
     * for this store
     */
    get options(): AppDataStoreOptions<GenericWebIndex, any> {
        const options = new AppDataStoreOptions<GenericWebIndex, any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return YouTubeChannelsIndexDataStore.getGenericWebIndex(data);
            }
        };
        return options;
    }
}
