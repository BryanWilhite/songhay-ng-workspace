import { Presentation } from 'songhay/core/models/presentation';

/**
 * defines the JSON, converted from XML
 * for a gen-web Presentation manifest
 *
 * @export
 * @class YouTubePresentation
 */
export interface YouTubePresentation {
    /**
     * gen-web Presentation
     *
     * @memberof YouTubePresentation
     */
    presentation: Presentation;

    /**
     * video meta-data for Presentation
     *
     * @type {{}[]}
     * @memberof YouTubePresentation
     */
    videos: {}[];
}
