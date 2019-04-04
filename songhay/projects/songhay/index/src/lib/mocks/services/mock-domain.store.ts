import * as lodash_ from 'lodash';
const _ = lodash_;

import { AppDataStoreOptions } from '@songhay/core';
import { DisplayItemModel } from 'songhay/core/models/display-item.model';

import { BlogEntry } from '../models/mock.models';
import { IndexEntriesStore } from '../../services/index-entries.store';

export class MockDomainStore extends IndexEntriesStore {
    /**
     * gets @type {DisplayItemModel[]}
     * from JSON of the @type {BlogEntry[]}
     */
    static getEntries(data: BlogEntry[]): DisplayItemModel[] {
        if (!data) {
            throw Error('The expected BlogEntry[] data shape is not here.');
        }
        const items = data.map(item => {
            const entry: DisplayItemModel = {
                description: item.content,
                displayText: item.title,
                id: item.slug,
                itemCategory: null,
                itemName: null,
                resourceIndicator: null,
                sortOrdinal: MockDomainStore.getSortOrdinal(item),
                tag: item.tag
            };
            return entry;
        });
        if (!items) {
            throw Error('The expected YouTubeItem[] data is not here.');
        }
        return items;
    }

    private static getItemCategoryProperties(blogEntry: BlogEntry): object {
        const o = JSON.parse(`{ ${blogEntry.itemCategory} }`);
        const topics = Object.keys(o).filter(function(v) {
            return v ? v.indexOf('topic-') === 0 : false;
        });
        o.topic = _(topics).isEmpty()
            ? '<!--zzz-->[no topic]'
            : `<!-- ${_(topics).first()} --> ${o[_(topics).first()]}`;
        o.topics = topics.map(function(v) {
            return {
                key: v,
                value: o[v]
            };
        });
        return o;
    }

    private static getSortOrdinal(blogEntry: BlogEntry): string {
        blogEntry.itemCategoryObject = MockDomainStore.getItemCategoryProperties(
            blogEntry
        );

        if (!blogEntry.itemCategoryObject) {
            return '';
        }
        const pad = function(num, size) {
            let s = String(num);
            while (s.length < size) {
                s = `0${s}`;
            }
            return s;
        };
        return (
            blogEntry.itemCategoryObject['year'] +
            '-' +
            pad(blogEntry.itemCategoryObject['month'], 2) +
            '-' +
            pad(blogEntry.itemCategoryObject['day'], 2) +
            '-' +
            blogEntry.slug
        );
    }

    /**
     * returns @type {AppDataStoreOptions<DisplayItemModel[], any>}
     * for this store
     */
    get options(): AppDataStoreOptions<DisplayItemModel[], any> {
        const options = new AppDataStoreOptions<DisplayItemModel[], any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return MockDomainStore.getEntries(data as BlogEntry[]);
            }
        };
        return options;
    }
}