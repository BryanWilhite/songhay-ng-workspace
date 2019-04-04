/**Defines the conventional Blog entry. */
export class BlogEntry {
    /**
     * Gets or sets the author.
     * @value
     * The author.
     */
    author: string;

    /**
     * Gets or sets the content.
     * @value
     * The content.
     */
    content: string;

    /**
     * Gets or sets the incept date.
     * @value
     * The incept date.
     */
    inceptDate: Date;

    /**
     * Gets or sets the published state.
     * @value
     * The published state.
     */
    isPublished: boolean | null;

    /**
     * Gets or sets the item category.
     * @value
     * The item category.
     */
    itemCategory: string;

    /**
     * Gets or sets the item category.
     * @value
     * The item category.
     */
    itemCategoryObject: object;

    /**
     * Gets or sets the modification date.
     * @value
     * The modification date.
     */
    modificationDate: Date;

    /**
     * Gets or sets the slug.
     * @value
     * The slug.
     */
    slug: string;

    /**
     * Gets or sets the sort ordinal.
     * @value
     * The sort ordinal.
     */
    sortOrdinal: string;

    /**
     * Gets or sets the tag.
     * @value
     * The tag.
     */
    tag: string;

    /**
     * Gets or sets the title.
     * @value
     * The title.
     */
    title: string;
}
