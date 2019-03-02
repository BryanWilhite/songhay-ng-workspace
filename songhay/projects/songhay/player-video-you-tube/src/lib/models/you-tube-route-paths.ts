/**
 * routing path data
 * for the @type {YouTubeModule}
 *
 * @export
 * @enum {number}
 */
export enum YouTubeRoutePaths {

    /**
     * the root path to the components
     * in this library
     */
    root = 'player/video/youtube/',

    /**
     * YouTube channel uploads: @type {YouTubeThumbsSetComponent}
     */
    uploads = 'uploads/:suffix/:id',
}
