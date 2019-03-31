import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppDataService } from '@songhay/core';
import { YouTubeScalars } from '../models/you-tube-scalars';

/**
 * YouTube Presentation data services
 *
 * @export
 */
@Injectable()
export class YouTubePresentationDataServices {
    /**
     * name of method on this class for Jasmine spies
     */
    static loadPresentationMethodName = 'loadPresentation';

    /**
     * name of method on this class for Jasmine spies
     */
    static loadVideosMethodName = 'loadVideos';

    /**
     * emits event when @member loadPresentation resolves
     */
    @Output()
    presentationLoaded: EventEmitter<{}>;

    /**
     * emits event when @member loadVideos resolves
     */
    @Output()
    videosLoaded: EventEmitter<{}>;

    /**
     * YouTube presentation data service
     */
    presentationDataService: AppDataService;

    /**
     * YouTube videos data service
     */
    videosDataService: AppDataService;

    /**
     * Creates an instance of YouTubePresentationDataServices.
     */
    constructor(client: Http) {
        this.presentationDataService = new AppDataService(client);
        this.videosDataService = new AppDataService(client);

        this.presentationLoaded = new EventEmitter();
        this.videosLoaded = new EventEmitter();
    }

    /**
     * loads b-roll Presentation metadata
     */
    loadPresentation(id: string): Promise<Response> {
        const uri = `${YouTubeScalars.rxYouTubeApiRootUri}${id}`;

        return this.presentationDataService.loadJson<{}>(uri, json =>
            this.presentationLoaded.emit(json)
        );
    }

    /**
     * loads YouTube video data
     */
    loadVideos(id: string): Promise<Response> {
        const uri = `${YouTubeScalars.rxYouTubeApiRootUri}${
            YouTubeScalars.rxYouTubeApiVideosPath
        }${id}`;

        return this.videosDataService.loadJson<{}>(uri, json =>
            this.videosLoaded.emit(json)
        );
    }
}
