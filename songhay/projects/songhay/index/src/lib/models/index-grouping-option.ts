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
     * the identifier or prefix
     * for display-item grouping
     *
     * refers to @type {Groupable.groupId}
     */
    groupId: string | number;

    /**
     * sort the group in descending order?
     */
    sortDescending: boolean;
}
