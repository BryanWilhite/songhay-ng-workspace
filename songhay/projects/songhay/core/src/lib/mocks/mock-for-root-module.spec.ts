import { TestBed, inject } from '@angular/core/testing';

import { MockForRootModule } from './mock-for-root-module';
import { MockClassThree, MockClassOne, MockClassTwo } from './mock-classes';
import { HttpClientOptions } from '../models/http-client-options';

describe(MockForRootModule.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MockForRootModule.forRoot({
                    reportProgress: true,
                    responseType: 'json'
                })
            ],
            providers: [MockClassThree]
        });
    });

    it('should provide root and three other providers', inject(
        [MockClassOne, MockClassTwo, MockClassThree, HttpClientOptions],
        (
            a: MockClassOne,
            b: MockClassTwo,
            c: MockClassThree,
            options: HttpClientOptions
        ) => {
            expect(a).toBeTruthy();
            expect(b).toBeTruthy();
            expect(c).toBeTruthy();
            expect(options).toBeTruthy();
            console.log({ a, b, c, options });
        }
    ));
});
