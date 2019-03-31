import { Presentation } from 'songhay/core/models/presentation';

/**
 * defines the JSON, converted from XML
 * for a gen-web Presentation manifest
 *
 * @export
 */
export interface YouTubePresentation {
    /**
     * gen-web Presentation
     */
    presentation: Presentation;

    /**
     * video meta-data for Presentation
     */
    videos: {}[];
}
