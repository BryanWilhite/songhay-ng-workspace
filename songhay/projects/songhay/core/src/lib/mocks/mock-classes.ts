import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Typicode } from './typicode.models';
import { AppDataStoreOptions } from '../services/app-data-store.options';
import { AppTabularDataStore } from '../services/app-tabular-data.store';
import { AppDataStore } from '../services/app-data.store';

@Injectable()
export class MockClassOne {
    values = ['one', 'two'];
}

@Injectable()
export class MockClassTwo {
    values = ['three', 'four'];
}

export class MockClassThree {
    values = ['five', 'six'];
}

export const LIVE_API_BASE_URI = 'http://jsonplaceholder.typicode.com';

@Injectable()
export class MockTabularDomainStore extends AppTabularDataStore<object, any> {
    constructor(client: HttpClient) {
        super(client);

        const options = new AppDataStoreOptions<object, any>();
        options.initialValue = () => ({ greeting: 'Hello world!' });

        this.options = options;
        super.setupObservables();
    }
}

@Injectable()
export class MockUserDomainStore extends AppTabularDataStore<Typicode.User, any> { }

@Injectable()
export class MockDomainStore extends AppDataStore<object, any> {

    constructor(client: HttpClient) {
        super(client);

        const options = new AppDataStoreOptions<object, any>();
        options.initialValue = () => ({ greeting: 'Hello world!' });

        this.options = options;
        super.setupObservables();
    }
}

@Injectable()
export class MockPhotoDomainStore extends AppDataStore<Typicode.Photo, any> { }
