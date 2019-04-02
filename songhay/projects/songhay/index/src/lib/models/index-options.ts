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
     */
    indexStoreUri: string;
}
