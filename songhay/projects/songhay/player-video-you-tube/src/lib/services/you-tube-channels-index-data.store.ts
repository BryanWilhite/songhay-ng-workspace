import { Injectable } from '@angular/core';
import { AppDataStore, SendMethods } from '@songhay/core';
import { GenericWebIndex } from '../models/generic-web-index';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * Stores YouTube Channel index data, curated by the Songhay studio.
 *
 * @export
 * @class YouTubeChannelsIndexDataStore
 * @extends {AppDataStore<GenericWebIndex, any>}
 */
@Injectable()
export class YouTubeChannelsIndexDataStore extends AppDataStore<
    GenericWebIndex,
    any
> {
    /**
     * gets the URI based on the specified @type {SendMethods}
     *
     * @static
     * @param {SendMethods} method
     * @param {string} [id]
     * @returns {string}
     * @memberof YouTubeChannelsIndexDataStore
     */
    static getUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${
                    YouTubeScalars.rxYouTubeApiVideosPath
                }${id}`;
        }
    }
}
