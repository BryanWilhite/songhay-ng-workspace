/**
 * centralizes magic strings for YouTube services, components, etc.
 *
 * @export
 */
export class YouTubeScalars {
    /**
     * base URI representing the b-roll endpoint
     * for YouTube curation
     */
    static rxYouTubeApiRootUri =
        'https://songhay-system-player.azurewebsites.net/api/Player/v1/video/youtube/';

    /**
     * URI path representing a YouTube channel
     * and/or YouTube `uploads`
     * curated as a `playlist`
     */
    static rxYouTubeApiPlaylistPath = 'playlist/uploads/';

    /**
     * URI path representing sets of YouTube `uploads`
     * curated as `playlists`
     */
    static rxYouTubeApiPlaylistsPath = 'playlists/';

    /**
     * URI path representing indices of curated as `playlists`
     * in @type {GenericWebIndex} format
     */
    static rxYouTubeApiPlaylistsIndexPath = 'playlist/index/';

    /**
     * URI path representing curated `videos`
     * or YouTube `items` for a gen-web
     */
    static rxYouTubeApiVideosPath = 'videos/';

    /**
     * base URI representing YouTube item watching
     */
    static rxYouTubeWatchRootUri = 'https://www.youtube.com/watch?v=';
}
