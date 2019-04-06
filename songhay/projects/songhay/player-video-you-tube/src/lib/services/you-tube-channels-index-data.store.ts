import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Segment } from 'songhay/core/models/segment';
import { Document } from 'songhay/core/models/document';
import { ObjectUtility } from 'songhay/core/utilities/object.utility';

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
        const segment = ObjectUtility.lowerCasePropertyChar(json) as Segment;
        if (!segment) {
            throw new Error('The expected GenericWebIndex Segment is not here.');
        }

        const objects = json['Documents'] as {}[];
        if (!objects) {
            throw new Error('The expected GenericWebIndex Document objects are not here.');
        }

        const documents = objects.map(o =>
            ObjectUtility.lowerCasePropertyChar(o)
        ) as Document[];
        if (!documents) {
            throw new Error('The expected GenericWebIndex documents are not here.');
        }

        const data = { ...segment, ...{ documents } } as unknown;
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

    constructor(client: HttpClient) {
        super(client);

        const options = new AppDataStoreOptions<GenericWebIndex, any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return YouTubeChannelsIndexDataStore.getGenericWebIndex(
                        data
                    );
            }
        };

        this.options = options;
    }
}
