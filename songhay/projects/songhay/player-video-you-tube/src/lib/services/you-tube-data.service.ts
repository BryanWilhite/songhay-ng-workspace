import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppDataService } from '@songhay/core';
import { YouTubeScalars } from '../models/you-tube-scalars';
import { YouTubeItem } from '../models/you-tube-item';

/**
 * YouTube data service
 *
 * @export
 */
@Injectable()
export class YouTubeDataService extends AppDataService {
    /**
     * name of method on this class for Jasmine spies
     */
    static loadChannelMethodName = 'loadChannel';

    /**
     * name of method on this class for Jasmine spies
     */
    static loadChannelSetMethodName = 'loadChannelSet';

    /**
     * name of method on this class for Jasmine spies
     */
    static loadChannelsIndexMethodName = 'loadChannelsIndex';

    /**
     * emits event when @member loadChannel resolves
     */
    @Output()
    channelLoaded: EventEmitter<{}>;

    /**
     * emits event when @member loadChannelSet resolves
     */
    @Output()
    channelSetLoaded: EventEmitter<{}>;

    /**
     * emits event when @member loadChannelsIndex resolves
     */
    @Output()
    channelsIndexLoaded: EventEmitter<{}>;

    /**
     * Creates an instance of @type {YouTubeDataService}.
     */
    constructor(client: Http) {
        super(client);

        this.channelLoaded = new EventEmitter();
        this.channelSetLoaded = new EventEmitter();
        this.channelsIndexLoaded = new EventEmitter();
        this.initialize();
    }

    /**
     * gets @type {YouTubeItem[]}
     * from JSON of the shape { items: [] } }
     */
    static getItems(json: {}): YouTubeItem[] {
        const items = json['items'] as YouTubeItem[];
        return items;
    }

    /**
     * gets @type {Map<string, YouTubeItem[]>}
     * from JSON of the shape { set: [{ items: [] }] }
     */
    static getItemsMap(json: {}): Map<string, YouTubeItem[]> {
        const set = Array.from(json['set']).filter(i => {
            const test = i && i['items'];
            if (!test) {
                console.warn({
                    component: YouTubeDataService.name,
                    message: 'getItemsMap(): item filtered out',
                    itemFilteredOut: i
                });
            }
            return test;
        });
        return new Map(
            set.map(o => {
                const items = YouTubeDataService.getItems(o);
                const key = items[0].snippet.channelTitle;
                return [key, items] as [string, YouTubeItem[]];
            })
        );
    }

    /**
     * loads YouTube channel
     */
    loadChannel(channelId: string): Promise<Response> {
        this.initialize();

        const uri = `${YouTubeScalars.rxYouTubeApiRootUri}${
            YouTubeScalars.rxYouTubeApiPlaylistPath
        }${channelId}`;

        return this.loadJson<{}>(uri, json => this.channelLoaded.emit(json));
    }

    /**
     * loads YouTube channel set
     */
    loadChannelSet(suffix: string, id: string): Promise<Response> {
        this.initialize();

        const uri = `${YouTubeScalars.rxYouTubeApiRootUri}${
            YouTubeScalars.rxYouTubeApiPlaylistsPath
        }${suffix}/${id}`;

        return this.loadJson<{}>(uri, json => this.channelSetLoaded.emit(json));
    }

    /**
     * loads YouTube channels index
     */
    loadChannelsIndex(suffix: string): Promise<Response> {
        this.initialize();

        const uri = `${YouTubeScalars.rxYouTubeApiRootUri}${
            YouTubeScalars.rxYouTubeApiPlaylistsIndexPath
        }${suffix}`;

        return this.loadJson<{}>(uri, json =>
            this.channelsIndexLoaded.emit(json)
        );
    }

    private initialize(): void {
        super.initializeLoadState();
    }
}
