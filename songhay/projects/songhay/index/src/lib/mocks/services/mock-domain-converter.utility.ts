import * as numeral from 'numeral';
import { first, isEmpty } from 'lodash';

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
        const items = index.map(entry => {
            const sortOrdinal = MockDomainConverterUtility.getSortOrdinal(entry);
            const blogTopics = entry.itemCategoryObject as BlogTopics;
            const itemMap = MapObjectUtility.getMapFromKeyValuePairs(blogTopics.topics);

            const key = `group-year-month-${entry.itemCategoryObject['year']}-${numeral(entry.itemCategoryObject['month']).format('00')}`;
            const value = `${entry.itemCategoryObject['year']}/${numeral(entry.itemCategoryObject['month']).format('00')}`;
            itemMap.set(key, value);

            const item: MenuDisplayItemModel = {
                description: entry.content,
                displayText: entry.title,
                groupDisplayText: value,
                groupId: key,
                id: entry.slug,
                inceptDate: entry.inceptDate,
                map: itemMap,
                modificationDate: entry.modificationDate,
                sortOrdinal: sortOrdinal
            };
            return item;
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

        const topics = Object.keys(o).filter(v => {
            return v ? v.indexOf('topic-') === 0 : false;
        });

        o.topic = isEmpty(topics)
            ? '<!--zzz-->[no topic]'
            : `<!-- ${first(topics)} --> ${o[first(topics)]}`;

        o.topics = topics.map(v => ({ key: v, value: `<!-- ${v} --> ${o[v]}` }));
        return o;
    }

    private static getSortOrdinal(blogEntry: BlogEntry): string {
        blogEntry.itemCategoryObject = MockDomainConverterUtility.getItemCategoryProperties(
            blogEntry
        );

        if (!blogEntry.itemCategoryObject) {
            return '';
        }

        return (
            blogEntry.itemCategoryObject['year'] +
            '-' +
            numeral(blogEntry.itemCategoryObject['month']).format('00') +
            '-' +
            numeral(blogEntry.itemCategoryObject['day']).format('00') +
            '-' +
            blogEntry.slug
        );
    }
}
