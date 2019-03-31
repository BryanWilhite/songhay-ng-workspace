import { YouTubeResourceId } from './you-tube-resource-id';
import { YouTubeThumbnails } from './you-tube-thumbnails';

/**
 * defines YouTube thumb snippet
 *
 * @export
 */
export interface YouTubeSnippet {
    /**
     * channel ID
     */
    channelId: string;

    /**
     * channel title
     */
    channelTitle: string;

    /**
     * description
     */
    description: string;

    /**
     * localized version of description and title
     */
    localized: { description: string; title: string }

    /**
     * playlist ID
     */
    playlistId: string;

    /**
     * position
     */
    position: number;

    /**
     * publish date
     */
    publishedAt: Date;

    /**
     * resource ID
     */
    resourceId: YouTubeResourceId;

    /**
     * tags
     */
    tags: string[]

    /**
     * thumbnail metadata
     */
    thumbnails: YouTubeThumbnails;

    /**
     * title
     */
    title: string;
}
