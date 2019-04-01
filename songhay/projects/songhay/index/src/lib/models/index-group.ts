import { SafeHtml } from '@angular/platform-browser';

/**
 * defines an index group
 *
 * @export
 */
export interface IndexGroup {
    /**
     * index group observable
     */
    group: Array<any>;

    /**
     * group display name
     */
    groupDisplayName: SafeHtml;

    /**
     * is group collapsed in the UI?
     */
    isCollapsed: boolean;
}
