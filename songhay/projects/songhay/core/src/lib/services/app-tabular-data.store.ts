import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpClientOptions } from '../models/http-client-options';
import { AppDataStoreOptions } from './app-data-store.options';
import { AppDataStore } from './app-data.store';
import { Observable, BehaviorSubject } from 'rxjs';
import { SendMethods } from '../models/send-methods.type';

@Injectable()
export class AppTabularDataStore<
    TDomain extends [],
    TError
> extends AppDataStore<TDomain, TError> {
    get rows(): Observable<TDomain> {
        return this.domainSubject.asObservable();
    }

    private dataStore: { rows: TDomain };

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
     * appends/reloads domain datum
     * with the specified strategy
     * for the rows of the internal data store
     *
     * @param {(number | string)} id
     * @param {() => string} uriGetter
     * @param {HttpClientOptions} [options={}]
     * @param {(data: object, rows: TDomain) => void} strategy
     * @memberof AppTabularDataStore
     */
    appendOrRefresh(
        id: number | string,
        uriGetter: () => string,
        options: HttpClientOptions = {},
        strategy: (data: object, rows: TDomain) => void
    ): void {
        const uri = uriGetter();
        const sub = this.tabularClient.get(uri, options).subscribe(data => {
            strategy(data, this.dataStore.rows);
            this.doNextTabularDomainSubject(data, 'get');
        });
        this.subscriptions.push(sub);
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
    loadAll(uri: string, options: HttpClientOptions = {}) {
        const sub = this.tabularClient.get(uri, options).subscribe(data => {
            this.doNextTabularDomainSubject(data, 'get');
        });
        this.subscriptions.push(sub);
    }

    private doNextTabularDomainSubject(
        data: object,
        method: SendMethods
    ): void {
        const domainData = this.getDomainData(data, method);
        this.dataStore.rows = domainData;
        this.domainSubject.next(Object.assign({}, this.dataStore).rows);
    }
}
