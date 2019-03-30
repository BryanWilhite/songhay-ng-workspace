/**
 * centralizes magic strings for YouTube services, components, etc.
 *
 * @export
 * @class YouTubeScalars
 */
export class YouTubeScalars {
    /**
     * base URI representing the b-roll endpoint
     * for YouTube curation
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeApiRootUri =
        'https://songhay-system-player.azurewebsites.net/api/Player/v1/video/youtube/';

    /**
     * URI path representing a YouTube channel
     * and/or YouTube `uploads`
     * curated as a `playlist`
     *
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeApiPlaylistPath = 'playlist/uploads/';

    /**
     * URI path representing sets of YouTube `uploads`
     * curated as `playlists`
     *
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeApiPlaylistsPath = 'playlists/';

    /**
     * URI path representing indices of curated as `playlists`
     * in @type {GenericWebIndex} format
     *
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeApiPlaylistsIndexPath = 'playlist/index/';

    /**
     * URI path representing curated `videos`
     * or YouTube `items` for a gen-web
     * @type {YouTubePresentation}
     *
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeApiVideosPath = 'videos/';

    /**
     * base URI representing YouTube item watching
     *
     * @static
     * @memberof YouTubeScalars
     */
    static rxYouTubeWatchRootUri = 'https://www.youtube.com/watch?v=';
}
