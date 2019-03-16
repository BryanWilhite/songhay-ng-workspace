import { Injectable } from '@angular/core';

/**
 * defines options for @type {AppDataService}
 *
 * @export
 * @class AppDataStoreOptions
 * @template TDomain
 * @template TError
 */
@Injectable()
export class AppDataStoreOptions<TDomain, TError> {

    /**
     * converts default @type {HttpClient} data
     * into the data of the application domain
     *
     * @memberof AppDataStoreOptions
     */
    domainConverter?: (data: object) => TDomain;

    /**
     * converts the server error type
     * into the error object
     * of the application domain
     *
     * @memberof AppDataStoreOptions
     */
    errorConverter?: (error: any) => TError;

    /**
     * returns and initial value
     * for @type {BehaviorSubject}
     *
     * @memberof AppDataStoreOptions
     */
    initialValue?: () => TDomain;
}
