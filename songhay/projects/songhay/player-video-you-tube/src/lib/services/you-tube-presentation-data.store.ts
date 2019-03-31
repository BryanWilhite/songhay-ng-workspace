import { Injectable } from '@angular/core';
import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';
import { YouTubeScalars } from '../models/you-tube-scalars';
import { YouTubePresentation } from '../models/you-tube-presentation';
import { Presentation } from 'songhay/core/models/presentation';

/**
 * Stores YouTube Channel index data, curated by the Songhay studio.
 *
 * @export
 */
@Injectable()
export class YouTubePresentationDataStore extends AppDataStore<
    Presentation,
    any
> {
    /**
     * gets @type {Presentation}
     * from json of the shape `{ Presentation: {} }`
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
