import * as lodash_ from 'lodash';
const _ = lodash_;

import { MapObjectUtility } from 'songhay/core/utilities/map-object.utility';
import { MenuDisplayItemModel } from 'songhay/core/models/menu-display-item.model';
import { AppDataStoreOptions } from '@songhay/core';

import { BlogEntry } from '../models/mock.models';

export interface BlogTopics {
    topic: string;
    topics: { key: string; value: any; }[];
}

export class MockDomainConverterUtility {
    /**
     * returns @type {AppDataStoreOptions<MenuDisplayItemModel[], any>}
     */
    static getAppDataStoreOptions(): AppDataStoreOptions<MenuDisplayItemModel[], any> {
        const options = new AppDataStoreOptions<MenuDisplayItemModel[], any>();
        options.domainConverter = (method, data) => {
            switch (method) {
                default:
                case 'get':
                    return MockDomainConverterUtility.getEntries(data as BlogEntry[]);
            }
        };
        return options;
    }

    private static getEntries(data: {}): MenuDisplayItemModel[] {
        if (!data) {
            throw Error('The expected {} data shape is not here.');
        }
        const wrapper = data as { index: [] };
        if (!wrapper) {
            throw Error('The expected { index: [] } data shape is not here.');
        }
        const index = wrapper.index as BlogEntry[];
        if (!index) {
            throw Error('The expected BlogEntry[] data shape is not here.');
        }
        const items = index.map(item => {
            const sortOrdinal = MockDomainConverterUtility.getSortOrdinal(item);
            const blogTopics = item.itemCategoryObject as BlogTopics;
            const entry: MenuDisplayItemModel = {
                description: item.content,
                displayText: item.title,
                groupDisplayText: blogTopics.topic,
                id: item.slug,
                inceptDate: item.inceptDate,
                map: MapObjectUtility.getMap(blogTopics.topics, (propertyName: string, propertyValue: any) => propertyValue),
                modificationDate: item.modificationDate,
                sortOrdinal: sortOrdinal
            };
            return entry;
        });
        if (!items) {
            throw Error('The expected YouTubeItem[] data is not here.');
        }
        return items;
    }

    private static getItemCategoryProperties(blogEntry: BlogEntry): { [key: string]: any } {
        const o = JSON.parse(`{ ${blogEntry.itemCategory} }`) as { [key: string]: any };
        if (!o) {
            throw new Error('The expected parsed category object is not here.');
        }

        const topics = Object.keys(o).filter(function (v) {
            return v ? v.indexOf('topic-') === 0 : false;
        });
        o.topic = _(topics).isEmpty()
            ? '<!--zzz-->[no topic]'
            : `<!-- ${_(topics).first()} --> ${o[_(topics).first()]}`;
        o.topics = topics.map(function (v) {
            return {
                key: v,
                value: o[v]
            };
        });
        return o;
    }

    private static getSortOrdinal(blogEntry: BlogEntry): string {
        blogEntry.itemCategoryObject = MockDomainConverterUtility.getItemCategoryProperties(
            blogEntry
        );

        if (!blogEntry.itemCategoryObject) {
            return '';
        }

        const pad = (num: string | number, size: number) => {
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
}
