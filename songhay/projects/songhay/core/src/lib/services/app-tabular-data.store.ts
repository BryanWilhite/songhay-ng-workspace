import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpClientOptions } from '../models/http-client-options';
import { SendMethods } from '../models/send-methods.type';
import { AppDataStoreOptions } from './app-data-store.options';
import { AppDataStore } from './app-data.store';

/**
 * defines a tabular data store
 * for the application domain
 *
 * @export
 * @class AppTabularDataStore
 * @extends {AppDataStore<TDomain, TError>}
 * @template TDomain
 * @template TError
 */
@Injectable()
export class AppTabularDataStore<TDomain, TError> extends AppDataStore<
    TDomain,
    TError
> {
    /**
     * gets the tabular data
     * of the internal data store
     *
     * @readonly
     * @type {Observable<TDomain>}
     * @memberof AppTabularDataStore
     */
    get rows(): Observable<TDomain[]> {
        return this.tabularDomainSubject.asObservable();
    }

    private tabularDomainSubject: BehaviorSubject<TDomain[]>;
    private dataStore: { rows: TDomain[] };

    /**
     *Creates an instance of AppDataStore.
     * @param {HttpClient} tabularClient
     * @param {AppDataStoreOptions<TDomain, TError>} [tabularOptions]
     * @memberof AppDataStore
     */
    constructor(
        private tabularClient: HttpClient,
        private tabularOptions?: AppDataStoreOptions<TDomain, TError>
    ) {
        super(tabularClient, tabularOptions);
    }

    /**
     * loads tabular data into the rows
     * of the internal data store
     *
     * @param {string} uri
     * @param {HttpClientOptions} [options={}]
     * @memberof AppTabularDataStore
     *
     * @tutorial https://coryrylan.com/blog/angular-observable-data-services
     */
    loadRows(uri: string, options: HttpClientOptions = {}) {
        const sub = this.tabularClient.get(uri, options).subscribe(data => {
            this.doNextTabularDomainSubject(data, 'get');
        });
        this.subscriptions.push(sub);
    }

    /**
     * gets/reloads domain datum
     * with the specified strategy @param {onNext}
     * for the rows of the internal data store
     *
     * @param {string} uri
     * @param {HttpClientOptions} [options={}]
     * @param {(data: object, rows: TDomain) => void} onNext
     * @memberof AppTabularDataStore
     */
    sendToChangeRows(
        method: SendMethods,
        uri: string,
        onNext: (data: object, rows: TDomain[]) => void,
        body: {} | null = null,
        options: HttpClientOptions = {}
    ): void {
        const defaultNext = (data: object) => {
            onNext(data, this.dataStore.rows);
            this.doNextTabularDomainSubject(data, method);
        };
        const defaultError = (error: any) => this.indicateError(uri, error);

        let sub: Subscription;

        switch (method) {
            case 'delete':
                sub = this.tabularClient
                    .delete(uri, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'get':
                sub = this.tabularClient
                    .get(uri, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'patch':
                sub = this.tabularClient
                    .patch(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'post':
                sub = this.tabularClient
                    .post(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'put':
                sub = this.tabularClient
                    .put(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
        }
        this.subscriptions.push(sub);
    }

    private doNextTabularDomainSubject(
        data: object,
        method: SendMethods
    ): void {
        const domainData = this.getTabularDomainData(data, method);
        this.dataStore.rows = domainData;
        this.tabularDomainSubject.next(Object.assign({}, this.dataStore).rows);
    }

    private getTabularDomainData(data: object, method: SendMethods): TDomain[] {
        const domainData =
            this.tabularOptions && this.tabularOptions.domainConverter
                ? this.tabularOptions.domainConverter(method, data) as TDomain[]
                : ((data as unknown) as TDomain[]);
        return domainData;
    }
}
