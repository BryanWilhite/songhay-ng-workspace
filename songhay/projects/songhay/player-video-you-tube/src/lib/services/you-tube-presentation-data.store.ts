import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';
import { YouTubeScalars } from '../models/you-tube-scalars';
import { YouTubePresentation } from '../models/you-tube-presentation';
import { Presentation } from 'songhay/core/models/presentation';

/**
 * Stores YouTube Channel index data, curated by the Songhay studio.
 *
 * @export
 * @class YouTubePresentationDataStore
 * @extends {AppDataStore<YouTubePresentation, any>}
 */
@Injectable()
export class YouTubePresentationDataStore extends AppDataStore<
    Presentation,
    any
> {
    /**
     * gets @type {Presentation}
     * from json of the shape `{ Presentation: {} }`
     *
     * @static
     * @param {{}} json
     * @returns {Presentation}
     * @memberof YouTubePresentationDataStore
     */
    static getPresentation(json: {}): Presentation {
        const data = json as { Presentation: {} };
        if (!data) {
            throw new Error('The expected Presentation shape is not here.');
        }
        const presentation = data.Presentation as Presentation;
        if (!presentation) {
            throw new Error('The expected Presentation is not here.');
        }
        return presentation;
    }

    /**
     * gets the URI based on the specified @type {SendMethods}
     *
     * @static
     * @param {SendMethods} method
     * @param {string} [id]
     * @returns {string}
     * @memberof YouTubePresentationDataStore
     */
    static getUri(method: SendMethods, id?: string): string {
        switch (method) {
            default:
            case 'get':
                return `${YouTubeScalars.rxYouTubeApiRootUri}${id}`;
        }
    }

    /**
     * returns @type {AppDataStoreOptions<Presentation, any>}
     * for this store
     *
     * @readonly
     * @static
     * @type {AppDataStoreOptions<Presentation, any>}
     * @memberof YouTubePresentationDataStore
     */
    get options(): AppDataStoreOptions<Presentation, any> {
        const options = new AppDataStoreOptions<Presentation, any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return YouTubePresentationDataStore.getPresentation(data);
            }
        };
        return options;
    }
}
