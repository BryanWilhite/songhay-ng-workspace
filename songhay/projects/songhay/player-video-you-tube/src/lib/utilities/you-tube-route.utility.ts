import { YouTubeRoutePaths } from '../models/you-tube-route-paths';

/**
 * static members for routes defined
 * in @type {YouTubeRoutePaths}
 */
export class YouTubeRouteUtility {
    /**
     * returns the result of filling in template
     * for `YouTubeRoutePaths.uploads`,
     * pre-pended with `YouTubeRoutePaths.root`.
     */
    public static getUploadsRoute(suffix: string, id: string) {
        return '/' +
            YouTubeRoutePaths.root +
            '/' +
            YouTubeRoutePaths.uploadsParameterized
                .replace(':suffix', suffix)
                .replace(':id', id);
    }
}
