import { Injectable } from '@angular/core';

import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { AppDataStoreOptions } from '@songhay/core';

import { IndexCssOption } from './index-css-option';
import { IndexGroupingOption } from './index-grouping-option';
import { IndexFlowStyles } from './index-flow-styles';

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
    appDataStoreOptions: AppDataStoreOptions<MenuDisplayItemModel[], any>;

    /**
     * default @type {IndexStyles}
     */
    defaultDisplayStyle = IndexFlowStyles.Groups;

    /**
     * @see @type {IndexCssOptions}
     */
    indexCssOptions: IndexCssOption[];

    /**
     * @see @type {IndexGroupingOption}
     */
    indexGroupingOptions?: IndexGroupingOption[];

    /**
     * location of the Index data
     * @remarks `./assets/data/app.json`
     */
    indexStoreDataUri: string;

    /**
     * first element of the Index `routerLink`
     * @remarks `['/blog/entry', item.slug]`
     */
    indexStoreItemUri: string;
    // TODO: add `ngIf` for `MenuDisplayItemModel.resourceIndicator`?

    /**
     * location of the Index data
     * @remarks `./assets/svg/sprites.svg`
     */
    indexStoreSpritesUri: string;
}
