import ILink from "../interfaces/ILink";

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

    /**
     * Exports the link in Onetab's format, which is
     * $url | $name
     * eg. https://github.com | Github
     * 
     * @returns String in the format of $url | $name
     */
    exportOnetab(): String {
        return `${this.url} | ${this.name}`
    }

}
