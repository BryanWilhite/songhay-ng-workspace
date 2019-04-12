import { Injectable } from '@angular/core';

import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { AppDataStoreOptions } from '@songhay/core';

import { IndexGroupingOption } from './index-grouping-option';
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
    appDataStoreOptions: AppDataStoreOptions<MenuDisplayItemModel[], any>;

    /**
     * default @type {IndexStyles}
     */
    defaultDisplayStyle = IndexStyles.Groups;

    /**
     * @inheritdoc
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
