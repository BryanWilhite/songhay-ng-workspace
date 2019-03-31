import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';


/**
 * default data service for this App
 *
 * @export
 * @deprecated see https://github.com/BryanWilhite/songhay-ng-workspace/issues/8#issuecomment-472557958
 */
@Injectable()
export class AppDataService {
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
     * Returns true when the API call is promising.
     */
    isLoading: boolean;

    /**
     *Creates an instance of @type {AppDataService}.
     */
    constructor(private client: Http) {
        this.isError = false;
        this.isLoaded = false;
        this.isLoading = false;
    }

    /**
     * gets the executor
     * for the constructor of @type {Promise}
     */
    getExecutor(
        uri: string,
        executorAction?: (response: Response, reject?: any) => void,
        requestArgs?: RequestOptionsArgs
    ) {
        const executor = (
            resolve: (Response) => void,
            reject: (any) => void
        ) => {
            this.client
                .get(uri, requestArgs)
                .toPromise()
                .then(
                    responseOrVoid => {
                        const response = responseOrVoid as Response;
                        if (!response) {
                            reject('response is not truthy.');
                            return;
                        }

                        if (executorAction) {
                            executorAction(response, reject);
                        }

                        this.isLoaded = true;
                        this.isLoading = false;

                        console.log({
                            memberName: `${AppDataService.name}.getExecutor()`,
                            uri,
                            isError: this.isError,
                            isLoaded: this.isLoaded,
                            isLoading: this.isLoading,
                            response
                        });

                        resolve(responseOrVoid);
                    },
                    error => {
                        this.isError = true;
                        this.isLoaded = false;
                        reject(error);
                    }
                );
        };
        return executor;
    }

    /**
     * initializes App data-loading state
     */
    initializeLoadState(): void {
        this.isError = false;
        this.isLoaded = false;
        this.isLoading = true;
    }

    /**
     * loads JSON from the specified URI
     */
    loadJson<TFromJson>(
        uri: string,
        responseAction: (json: TFromJson, reject?: any) => void,
        requestArgs?: RequestOptionsArgs
    ): Promise<Response> {
        const executorAction = (response: Response, reject: any) => {
            const data = response.json() as TFromJson;

            if (!data) {
                reject('response JSON data is not truthy.');
                return;
            }

            responseAction(data, reject);
        };

        console.log({
            memberName: `${AppDataService.name}.loadJson<T>()`,
            uri,
            isError: this.isError,
            isLoaded: this.isLoaded,
            isLoading: this.isLoading
        });
        const promise = new Promise<Response>(
            this.getExecutor(uri, executorAction, requestArgs)
        );

        return promise;
    }
}
