import { SafeHtml } from '@angular/platform-browser';

import { BlogEntry } from '../models/songhay-blog-entry';

/**
 * defines an index group
 *
 * @export
 * @class IndexGroup
 */
export class IndexGroup {
    /**
     * index group observable
     *
     * @type {string}
     * @memberof IndexGroup
     */
    group: Array<BlogEntry>;

    /**
     * group display name
     *
     * @type {SafeHtml}
     * @memberof IndexGroup
     */
    groupDisplayName: SafeHtml;

    /**
     * is group collapsed in the UI?
     *
     * @type {boolean}
     * @memberof IndexGroup
     */
    isCollapsed: boolean;
}
