import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppDataStore, AppDataStoreOptions, SendMethods } from '@songhay/core';

import { Presentation } from 'songhay/core/models/presentation';
import { YouTubeScalars } from '../models/you-tube-scalars';

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

    constructor(client: HttpClient) {
        super(client);

        const options = new AppDataStoreOptions<Presentation, any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return YouTubePresentationDataStore.getPresentation(data);
            }
        };

        this.options = options;
    }
}
