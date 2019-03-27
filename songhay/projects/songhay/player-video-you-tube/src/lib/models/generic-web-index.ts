import { Fragment } from 'songhay/core/models/fragment';

/**
 * Defines an index based on GenericWeb types.
 *
 * @export
 * @interface GenericWebIndex
 */
export interface GenericWebIndex {
    /**
     * @type{Segment.clientId}
     *
     * @type {string}
     * @memberof GenericWebIndex
     */
    clientId: string;

    /**
     * patched version of @type {Document[]} with {Fragment[]}
     *
     * @type {{
     *         clientId: string;
     *         fragments: Fragment[];
     *         modificationDate: Date;
     *     }[]}
     * @memberof GenericWebIndex
     */
    documents: {
        clientId: string;
        fragments: Fragment[];
        modificationDate: Date;
        title: string;
    }[];

    /**
     * @type{Segment.segmentName}
     *
     * @type {string}
     * @memberof GenericWebIndex
     */
    segmentName: string;
}
