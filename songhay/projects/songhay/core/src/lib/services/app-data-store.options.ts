import { SendMethods } from '../models/send-methods.type';
import { Injectable } from "@angular/core";

/**
 * defines options for @type {AppDataStore}
 *
 * @export
 */
@Injectable()
export class AppDataStoreOptions<TDomain, TError> {

    /**
     * converts default @type {HttpClient} data
     * into the data of the application domain
     */
    domainConverter?: (method: SendMethods, data: object) => TDomain | TDomain[];

    /**
     * converts the server error type
     * into the error object
     * of the application domain
     */
    errorConverter?: (error: any) => TError;

    /**
     * returns and initial value
     * for @type {BehaviorSubject}
     */
    initialValue?: () => TDomain;
}
