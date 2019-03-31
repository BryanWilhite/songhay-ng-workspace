import { Fragment } from 'songhay/core/models/fragment';

/**
 * Defines an index based on GenericWeb types.
 *
 * @export
 */
export interface GenericWebIndex {
    /**
     * maps to @type {Segment.clientId}
     */
    clientId: string;

    /**
     * patched version of @type {Document[]} with {Fragment[]}
     */
    documents: {
        clientId: string;
        fragments: Fragment[];
        modificationDate: Date;
        title: string;
    }[];

    /**
     * maps to @type{Segment.segmentName}
     */
    segmentName: string;
}
