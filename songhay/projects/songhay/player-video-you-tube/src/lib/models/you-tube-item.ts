import { YouTubeSnippet } from './you-tube-snippet';
import { YouTubeContentDetails } from './you-tube-content-details';

/**
 * defines YouTube API item
 * of the specified kind
 *
 * the item is the central JSON shape
 * of this API
 *
 * @export
 */
export interface YouTubeItem {
    /**
     * entity tag to detect content changes
     */
    etag: string;

    /**
     * unique ID for item
     */
    id: string;

    /**
     * the kind of the item
     *
     * the kinds used so far:
     *
     * youtube#video
     * youtube#videoListResponse
     */
    kind: string;

    /**
     * YouTube API snippet
     */
    snippet: YouTubeSnippet;

    /**
     * YouTube item content details
     */
    contentDetails: YouTubeContentDetails;
}
