import { YouTubeThumbnail } from './you-tube-thumbnail';

/**
 * defines YouTube thumbnail metadata
 *
 * @export
 */
export interface YouTubeThumbnails {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
    standard: YouTubeThumbnail;
    maxres: YouTubeThumbnail;
}
