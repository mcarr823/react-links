/**
 * Interface which describes a Link object.
 */
export default interface ILink {

    /**
     * Name of the link.
     *
     * This could be the name of the website.
     * eg. GitHub.
     *
     * Or it could be a nickname for a bookmark.
     * eg. "2024 Taxes", which could be a Drive folder.
     */
    name: string;

    /**
     * URL to open when the link is clicked.
     *
     * Usually a http or https link, but in theory any url scheme should work.
     */
    url: string;

    /**
     * Name of the favicon to show next to this link.
     */
    favicon: string;

}
