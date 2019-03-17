import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AppDataStoreOptions } from './app-data-store.options';
import { filter } from 'rxjs/operators';

type SendMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

@Injectable()
export class AppDataStore<TDomain, TError> implements OnDestroy {
    /**
     * Returns true when the API call is busy.
     *
     * @type {boolean}
     * @memberof AppDataService
     */
    isBusy: boolean;

    /**
     * Returns true when the last API promise is rejected.
     *
     * @type {boolean}
     * @memberof BlogEntriesService
     */
    isError: boolean;

    /**
     * Returns true when the last API call loaded data
     * without any errors.
     *
     * @type {boolean}
     * @memberof AppDataService
     */
    isLoaded: boolean;

    /**
     * Observes the service data.
     *
     * @type {Observable<TDomain>}
     * @memberof AppDataStore
     */
    serviceData: Observable<TDomain>;

    /**
     * Observes any service errors.
     *
     * @type {Observable<TError>}
     * @memberof AppDataStore
     */
    serviceError: Observable<TError>;

    private domainSubject: BehaviorSubject<TDomain>;
    private serviceErrorSubject: BehaviorSubject<TError>;
    private subscriptions: Subscription[];

    /**
     *Creates an instance of AppDataStore.
     * @param {HttpClient} client
     * @param {AppDataStoreOptions<TDomain, TError>} [options]
     * @memberof AppDataStore
     */
    constructor(
        private client: HttpClient,
        private options?: AppDataStoreOptions<TDomain, TError>
    ) {
        this.isError = false;
        this.isLoaded = false;
        this.isBusy = false;
        this.subscriptions = [];
        this.setupObservables();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(i => {
            if (i) {
                i.unsubscribe();
            }
        });
    }

    /**
     * Initializes App data-loading state.
     *
     * @memberof AppDataService
     */
    initializeLoadState(): void {
        this.isError = false;
        this.isLoaded = false;
        this.isBusy = true;
    }

    /**
     * Load domain data from the specified URI.
     *
     * @param {string} uri
     * @param {({
     *             headers?:
     *                 | HttpHeaders
     *                 | {
     *                       [header: string]: string | string[];
     *                   };
     *             observe?: 'body';
     *             params?:
     *                 | HttpParams
     *                 | {
     *                       [param: string]: string | string[];
     *                   };
     *             reportProgress?: boolean;
     *             responseType?: 'json';
     *             withCredentials?: boolean;
     *         })} [options={}]
     * @memberof AppDataStore
     */
    load(
        uri: string,
        options: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } = {}
    ): void {
        this.send('get', uri, null, options);
    }

    /**
     * Load domain data from the specified URI.
     *
     * @param {string} uri
     * @param {({
     *             headers?:
     *                 | HttpHeaders
     *                 | {
     *                       [header: string]: string | string[];
     *                   };
     *             observe?: 'body';
     *             params?:
     *                 | HttpParams
     *                 | {
     *                       [param: string]: string | string[];
     *                   };
     *             reportProgress?: boolean;
     *             responseType?: 'json';
     *             withCredentials?: boolean;
     *         })} [options={}]
     * @memberof AppDataStore
     */
    loadAsync(
        uri: string,
        options: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } = {}
    ): Promise<object> {
        return this.sendAsync('get', uri, null, options);
    }

    /**
     * Sends domain data to the specified URI.
     *
     * @param {string} uri
     * @param {({
     *             headers?:
     *                 | HttpHeaders
     *                 | {
     *                       [header: string]: string | string[];
     *                   };
     *             observe?: 'body';
     *             params?:
     *                 | HttpParams
     *                 | {
     *                       [param: string]: string | string[];
     *                   };
     *             reportProgress?: boolean;
     *             responseType?: 'json';
     *             withCredentials?: boolean;
     *         })} [options={}]
     * @memberof AppDataStore
     */
    send(
        method: SendMethods,
        uri: string,
        body?: any,
        options: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } = {}
    ): void {
        const defaultNext = (data: object) => {
            this.indicateLoadedState();
            this.doNextDomainSubject(this.domainSubject, data);
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
     *
     * @param {string} uri
     * @param {({
     *             headers?:
     *                 | HttpHeaders
     *                 | {
     *                       [header: string]: string | string[];
     *                   };
     *             observe?: 'body';
     *             params?:
     *                 | HttpParams
     *                 | {
     *                       [param: string]: string | string[];
     *                   };
     *             reportProgress?: boolean;
     *             responseType?: 'json';
     *             withCredentials?: boolean;
     *         })} [options={}]
     * @memberof AppDataStore
     */
    sendAsync(
        method: SendMethods,
        uri: string,
        body?: any,
        options: {
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
            observe?: 'body';
            params?:
                | HttpParams
                | {
                      [param: string]: string | string[];
                  };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } = {}
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

    private doNextDomainSubject(
        subject: BehaviorSubject<TDomain>,
        data: object
    ) {
        const domainData =
            this.options && this.options.domainConverter
                ? this.options.domainConverter(data)
                : ((data as unknown) as TDomain);

        if (domainData) {
            subject.next(domainData);
        }
    }

    private indicateBusyState(): void {
        this.isLoaded = false;
        this.isBusy = true;
    }

    private indicateError(uri: string, error: any): void {
        this.isError = true;
        this.serviceErrorSubject.next(error);
        console.error(`${AppDataStore.name}.indicateError`, {
            uri,
            isError: this.isError,
            isLoaded: this.isLoaded,
            isLoading: this.isBusy,
            error
        });
    }

    private indicateLoadedState(): void {
        this.isLoaded = true;
        this.isBusy = false;
    }

    private setupObservables(): void {
        if (this.options && this.options.errorConverter) {
            const initialErrorState = this.options.errorConverter(null);
            this.serviceErrorSubject = new BehaviorSubject(initialErrorState);
        } else {
            this.serviceErrorSubject = new BehaviorSubject(null);
        }
        this.serviceError = this.serviceErrorSubject.asObservable();

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
