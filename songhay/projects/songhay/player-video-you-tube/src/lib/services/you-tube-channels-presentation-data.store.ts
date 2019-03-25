import { Injectable } from '@angular/core';
import { AppDataStore, SendMethods } from '@songhay/core';
import { YouTubeScalars } from '../models/you-tube-scalars';
import { YouTubePresentation } from '../models/you-tube-presentation';

/**
 * Stores YouTube Channel index data, curated by the Songhay studio.
 *
 * @export
 * @class YouTubeChannelsPresentationDataStore
 * @extends {AppDataStore<YouTubePresentation, any>}
 */
@Injectable()
export class YouTubeChannelsPresentationDataStore extends AppDataStore<
    YouTubePresentation,
    any
> {
    /**
     * gets the URI based on the specified @type {SendMethods}
     *
     * @static
     * @param {SendMethods} method
     * @param {string} [id]
     * @returns {string}
     * @memberof YouTubeChannelsPresentationDataStore
     */
    static getUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${id}`;
        }
    }
}
