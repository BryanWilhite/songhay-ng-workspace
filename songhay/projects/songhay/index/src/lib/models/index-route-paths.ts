/**
 * the route parameter
 * for setting @type {IndexStyles}
 */
export const ROUTE_PARAM_DISPLAY_STYLE = 'style';

const ROOT = 'index';

/**
 * routing path data
 * for the @type {IndexModule}
 *
 * @export
 */
export class IndexRoutePaths {
    /**
     * the root path to the components
     * in this library with parameter
     */
    static root = ROOT;

    /**
     * the root path to the components
     * in this library with parameter
     */
    static rootParameterized = `${ROOT}/:${ROUTE_PARAM_DISPLAY_STYLE}`;
}
