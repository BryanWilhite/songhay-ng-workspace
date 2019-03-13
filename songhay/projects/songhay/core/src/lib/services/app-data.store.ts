import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppDataStore<TFromJson> {
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
     * Observes the service call data.
     *
     * @type {Observable<any>}
     * @memberof AppDataStore
     */
    serviceCallData: Observable<any>;

    /**
     * Observes the service data.
     *
     * @type {Observable<TFromJson>}
     * @memberof AppDataStore
     */
    serviceData: Observable<TFromJson>;

    private serviceCallSubject: BehaviorSubject<any>;
    private serviceSubject: BehaviorSubject<TFromJson>;

    /**
     *Creates an instance of AppDataStore.
     * @param {HttpClient} client
     * @param {TFromJson} [initialValue=null]
     * @memberof AppDataStore
     */
    constructor(private client: HttpClient, initialValue: TFromJson = null) {
        this.isError = false;
        this.isLoaded = false;
        this.isBusy = false;

        this.serviceCallSubject = new BehaviorSubject(null);
        this.serviceCallData = this.serviceCallSubject.asObservable();

        this.serviceSubject = new BehaviorSubject(initialValue);
        this.serviceData = this.serviceSubject.asObservable();
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
     *         })} [options=null]
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
        } = null
    ): void {
        this.indicateBusyState();
        this.client.get(uri, options).subscribe(
            data => {
                this.indicateLoadedState();

                const domainData = data as TFromJson;
                this.serviceSubject.next(domainData);
            },
            error => this.indicateError(uri, error)
        );
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
     *         })} [options=null]
     * @memberof AppDataStore
     */
    send(
        method: 'delete' | 'patch' | 'post' | 'put',
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
        } = null
    ): void {
        this.indicateBusyState();
        switch (method) {
            case 'delete':
                this.client.delete(uri, options).subscribe(
                    data => {
                        this.indicateLoadedState();
                        this.serviceCallSubject.next(data);
                    },
                    error => this.indicateError(uri, error)
                );
                break;
            case 'patch':
                this.client.patch(uri, options).subscribe(
                    data => {
                        this.indicateLoadedState();
                        this.serviceCallSubject.next(data);
                    },
                    error => this.indicateError(uri, error)
                );
                break;
            case 'post':
                this.client.post(uri, options).subscribe(
                    data => {
                        this.indicateLoadedState();
                        this.serviceCallSubject.next(data);
                    },
                    error => this.indicateError(uri, error)
                );
                break;
            case 'put':
                this.client.put(uri, options).subscribe(
                    data => {
                        this.indicateLoadedState();
                        this.serviceCallSubject.next(data);
                    },
                    error => this.indicateError(uri, error)
                );
                break;
        }
    }

    private indicateBusyState(): void {
        this.isLoaded = false;
        this.isBusy = true;
    }

    private indicateError(uri: string, error: any): void {
        this.isError = true;
        console.error({
            memberName: `${AppDataStore.name}.load()`,
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
}
