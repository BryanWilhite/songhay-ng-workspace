import { GenericWebIndex } from '../models/generic-web-index';

/**
 * static members for @type {GenericWebIndex}
 * for YouTube API data
 *
 * @export
 * @class GenericWebIndexUtility
 */
export class GenericWebIndexUtility {
    /**
     * gets the set display name
     * for the curated YouTube channels
     *
     * @static
     * @param {GenericWebIndex} data
     * @returns {string}
     * @memberof GenericWebIndexUtility
     */
    static getChannelsSetDisplayName(data: GenericWebIndex): string {
        GenericWebIndexUtility.NullCheck(data);
        return data.segmentName;
    }

    /**
     * gets the set title
     * for the curated YouTube channels
     *
     * @static
     * @param {string} channelSetId
     * @param {GenericWebIndex} data
     * @returns {string}
     * @memberof GenericWebIndexUtility
     */
    static getChannelsSetTitle(channelSetId: string, data: GenericWebIndex): string {
        GenericWebIndexUtility.NullCheck(data);
        const document = data.documents.find(i => {
            return i.clientId === channelSetId;
        });
        return document.title;
    }

    private static NullCheck(data: GenericWebIndex): void {
        if (!data) {
            throw Error(
                `The expected GenericWebIndex data is not here. Caller: ${
                    GenericWebIndexUtility.NullCheck.caller.name
                }`
            );
        }
    }
}
