import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, skip } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { AppDataStoreOptions } from './app-data-store.options';
import { HttpClientOptions } from '../models/http-client-options';
import { SendMethods } from '../models/send-methods.type';

/**
 * Defines the core Observable data store
 * with optional support for Promises.
 *
 * @export
 */
@Injectable()
export class AppDataStore<TDomain, TError> implements OnDestroy {
    /**
     * Returns true when the API call is busy.
     */
    isBusy: boolean;

    /**
     * Returns true when the last API promise is rejected.
     */
    isError: boolean;

    /**
     * Returns true when the last API call loaded data
     * without any errors.
     */
    isLoaded: boolean;

    /**
     * Observes the service data.
     */
    serviceData: Observable<TDomain>;

    /**
     * Observes any service errors.
     */
    serviceError: Observable<TError>;

    protected subscriptions: Subscription[];

    private domainSubject: BehaviorSubject<TDomain>;
    private serviceErrorSubject: BehaviorSubject<TError>;

    /**
     *Creates an instance of AppDataStore.
     */
    constructor(private client: HttpClient) {
        this.isError = false;
        this.isLoaded = false;
        this.isBusy = false;
        this.subscriptions = [];
        this.setupObservables();
    }

    /**
     * A lifecycle hook that is called
     * when a directive, pipe,
     * or service is destroyed.
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(i => {
            if (i) {
                i.unsubscribe();
            }
        });
    }

    /**
     * Initializes App data-loading state.
     */
    initializeLoadState(): void {
        this.isError = false;
        this.isLoaded = false;
        this.isBusy = true;
    }

    /**
     * Load domain data from the specified URI.
     */
    load(uri: string, options: HttpClientOptions = {}): void {
        this.send('get', uri, null, options);
    }

    /**
     * Load domain data from the specified URI.
     */
    loadAsync(uri: string, options: HttpClientOptions = {}): Promise<object> {
        return this.sendAsync('get', uri, null, options);
    }

    /**
     * Sends domain data to the specified URI.
     */
    send(
        method: SendMethods,
        uri: string,
        body: {} | null = null,
        options: HttpClientOptions = {}
    ): void {
        const defaultNext = (data: object) => {
            this.indicateLoadedState();
            this.doNextDomainSubject(this.domainSubject, data, method);
        };
        const defaultError = (error: any) => this.indicateError(uri, error);

        let sub: Subscription;

        this.indicateBusyState();

        switch (method) {
            case 'delete':
                sub = this.client
                    .delete(uri, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'get':
                sub = this.client
                    .get(uri, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'patch':
                sub = this.client
                    .patch(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'post':
                sub = this.client
                    .patch(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
            case 'put':
                sub = this.client
                    .patch(uri, body, options)
                    .subscribe(defaultNext, defaultError);
                break;
        }

        this.subscriptions.push(sub);
    }

    /**
     * Sends domain data to the specified URI.
     */
    sendAsync(
        method: SendMethods,
        uri: string,
        body: {} | null = null,
        options: HttpClientOptions = {}
    ): Promise<object> {
        let promise: Promise<object>;
        this.indicateBusyState();
        switch (method) {
            case 'delete':
                promise = this.client.delete(uri, options).toPromise();
                break;
            case 'get':
                promise = this.client.get(uri, options).toPromise();
                break;
            case 'patch':
                promise = this.client.patch(uri, body, options).toPromise();
                break;
            case 'post':
                promise = this.client.post(uri, body, options).toPromise();
                break;
            case 'put':
                promise = this.client.put(uri, body, options).toPromise();
                break;
        }

        promise.then(
            () => this.indicateLoadedState(),
            error => this.indicateError(uri, error)
        );
        return promise;
    }

    /**
     * returns domain-specific options
     * to be overridden in a subclass
     */
    get options(): AppDataStoreOptions<TDomain, TError> {
        return null;
    }

    protected indicateError(uri: string, error: any): void {
        this.isError = true;
        this.serviceErrorSubject.next(error);
        console.error(`${AppDataStore.name}.indicateError`, {
            uri,
            isError: this.isError,
            isLoaded: this.isLoaded,
            isBusy: this.isBusy,
            error
        });
    }

    private getDomainData(data: object, method: SendMethods): TDomain {
        const domainData =
            this.options && this.options.domainConverter
                ? (this.options.domainConverter(method, data) as TDomain)
                : ((data as unknown) as TDomain);
        return domainData;
    }

    private doNextDomainSubject(
        subject: BehaviorSubject<TDomain>,
        data: object,
        method: SendMethods
    ): void {
        const domainData = this.getDomainData(data, method);
        if (domainData) {
            subject.next(domainData);
        }
    }

    private indicateBusyState(): void {
        this.isLoaded = false;
        this.isBusy = true;
    }

    private indicateLoadedState(): void {
        this.isLoaded = true;
        this.isBusy = false;
    }

    private setupObservables(): void {
        if (this.options && this.options.errorConverter) {
            const initialErrorState = this.options.errorConverter(null);
            this.serviceErrorSubject = new BehaviorSubject(initialErrorState);
            this.serviceError = this.serviceErrorSubject.asObservable();
        } else {
            this.serviceErrorSubject = new BehaviorSubject(null);
            this.serviceError = this.serviceErrorSubject
                .asObservable()
                .pipe(skip(1)); // skip initial value, `null`
        }

        if (this.options && this.options.initialValue) {
            const initialValue = this.options.initialValue();
            this.domainSubject = new BehaviorSubject(initialValue);
        } else {
            this.domainSubject = new BehaviorSubject(null);
        }

        const filterOutAnyNullInitialValue = (x: TDomain, i: number) =>
            i === 0 && !x ? false : true;

        this.serviceData = this.domainSubject
            .asObservable()
            .pipe(filter(filterOutAnyNullInitialValue));
    }
}
