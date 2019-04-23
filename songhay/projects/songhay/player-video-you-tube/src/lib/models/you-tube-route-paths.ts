/**
 * routing path data
 * for the @type {YouTubeModule}
 *
 * @export
 */
export enum YouTubeRoutePaths {

    /**
     * the root path to the components
     * in this library
     */
    root = 'player/video/youtube',

    /**
     * YouTube channel uploads: @type {YouTubePresentationComponent}
     */
    presentation = 'presentation',

    /**
     * YouTube channel uploads: @type {YouTubePresentationComponent}
     */
    presentationParameterized = 'presentation/:id',

    /**
     * YouTube channel uploads: @type {YouTubeThumbsSetComponent}
     */
    uploads = 'uploads',

    /**
     * YouTube channel uploads: @type {YouTubeThumbsSetComponent}
     */
    uploadsParameterized = 'uploads/:suffix/:id',
}
