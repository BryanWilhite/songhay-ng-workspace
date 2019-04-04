import { TestBed, inject } from '@angular/core/testing';

import { MockForRootModule } from './mock-for-root-module';
import { MockClassThree } from './mock-classes';

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

    it('should provide root and three other providers', inject([], () => {}));
});
