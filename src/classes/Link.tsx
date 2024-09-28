/**
 * Represents a URL displayed on the website.
 */
export default class Link implements ILink {
    
    name: string;
    url: string;
    favicon: string;

    /**
     * @param name Name of the website. eg. GitHub
     * @param url URL of the website. eg. https://github.com
     * @param favicon Name of the favicon, if one has been downloaded.
     * Otherwise it should be an empty string.
     */
    constructor(args: ILink){
        this.name = args.name
        this.url = args.url
        this.favicon = args.favicon
    }

    /**
     * Get the filesystem path of the favicon.
     * 
     * @returns Path to the favicon, or an empty string if one
     * hasn't been downloaded yet.
     */
    getFavicon(){
        
        if (this.favicon.length === 0){
            return ""
        }
        
        return `/data/favicons/${this.favicon}`

    }

}

export interface ILink {

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