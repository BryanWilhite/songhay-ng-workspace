import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * static members for DOM manipulation
 *
 * @export
 */
export class DomSanitizerUtility {
    /**
     * gets @type {SafeHtml} with the specified @type {DomSanitizer}
     */
    static getSanitizedHtml(sanitizer: DomSanitizer, element: Element): SafeHtml {
        return sanitizer.bypassSecurityTrustHtml(element.outerHTML);
    }
}
