import { AppDataStore } from '@songhay/core';
import { YouTubeItem } from '@songhay/player-video-you-tube';

/**
 * Stores map of YouTube items for displaying sets of thumbnails by channel.
 *
 * @export
 * @class YouTubeChannelSetDataStore
 * @extends {AppDataStore<Map<string, YouTubeItem[]>, any>}
 */
export class YouTubeChannelSetDataStore extends AppDataStore<Map<string, YouTubeItem[]>, any> {}
