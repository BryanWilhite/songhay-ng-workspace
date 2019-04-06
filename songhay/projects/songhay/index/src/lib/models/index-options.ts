import { Injectable } from '@angular/core';

import { DisplayItemModel } from 'songhay/core/models/display-item.model';
import { AppDataStoreOptions } from '@songhay/core';

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
     * options for the underlying @type {AppDataStore}
     */
    appDataStoreOptions: AppDataStoreOptions<DisplayItemModel[], any>;

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
