import { NgModule, ModuleWithProviders } from '@angular/core';

import { HttpClientOptions } from '../models/http-client-options';
import { MockClassOne, MockClassTwo } from './mock-classes';

@NgModule({
    providers: [MockClassOne, MockClassTwo]
})
export class MockForRootModule {
    /**
     * injects providers into this root-level module
     *
     * @see https://angularfirst.com/the-ngmodule-forroot-convention/
     */
    static forRoot(options: HttpClientOptions): ModuleWithProviders<MockForRootModule> {
        return { ngModule: MockForRootModule, providers: [provideOptions(options)] };
    }
}

/**
 * provider function
 *
 * @export
 * @see https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L158
 */
export function provideOptions(options: HttpClientOptions): {}[] {
    return [{ provide: HttpClientOptions, useValue: options }];
}
