import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * defines observable data store options
 * for services wrapping @type {HttpClient}
 *
 * @export
 */
export class HttpClientOptions {
    /**
     * headers used by members
     * such as `HttpClient.get()`
     *
     * @see https://angular.io/api/common/http/HttpClient#get
     * @see https://angular.io/api/common/http/HttpHeaders
     */
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };

    /**
     * indicates which part of the response to observe;
     * by default, it is `'body'`
     * of `'body' | 'events' | 'response'`
     *
     * @see https://github.com/angular/angular/blob/65d839da03dbe24b21d6e31179c0ba06c3b5cf3d/packages/common/http/src/client.ts#L45
     */
    observe?: 'body';

    /**
     * parameters use by members
     * such as `HttpClient.get()`
     *
     * @see https://angular.io/api/common/http/HttpClient#get
     * @see https://angular.io/api/common/http/HttpParams
     */
    params?:
        | HttpParams
        | {
              [param: string]: string | string[];
          };

    /**
     * set to `true` to enable tracking of progress events;
     * use with `observe: 'events'`
     *
     * @see https://angular.io/guide/http#listening-to-progress-events
     */
    reportProgress?: boolean;

    /**
     * specifies HTTP response types:
     * 'arraybuffer' | 'blob' | 'text' | 'json';
     *
     */
    responseType?: 'json';

    /**
     * sets `XMLHttpRequest.withCredentials`
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
     */
    withCredentials?: boolean;
}
