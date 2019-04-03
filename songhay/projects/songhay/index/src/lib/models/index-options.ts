import { Injectable } from '@angular/core';

import { IndexStyles } from './index-styles';

/**
 * options for Index
 * injectable at the module level
 *
 * @export
 */
@Injectable()
export class IndexOptions {
    /**
     * default @type {IndexStyles}
     */
    defaultDisplayStyle = IndexStyles.Groups;

    /**
     * location of the Index data
     * @remarks `./assets/data/app.json`
     */
    indexStoreUri: string;

    /**
     * `routerLink` of the Index
     * @remarks `['/blog/entry', j.slug]`
     */
    indexRouterLink: string[];
}
