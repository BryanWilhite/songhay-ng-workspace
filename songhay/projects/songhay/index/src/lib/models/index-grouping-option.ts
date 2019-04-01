/**
 * Defines index grouping options
 * for drop-down/select list UX.
 *
 * @export
 */
export interface IndexGroupingOption {
    /**
     * the display name in the UI
     */
    displayName: string;

    /**
     * the property name
     * of the index backing object
     * to group by
     */
    groupByPropertyName: string;

    /**
     * sort the group in descending order?
     */
    sortDescending: boolean;
}
