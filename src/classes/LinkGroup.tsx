import Link from "./Link";

/**
 * Represents a group of links.
 * 
 * TODO add other parameters, such as color, icon, etc.
 */
export default class LinkGroup{

    name: string;
    links: Array<Link>;

    /**
     * @param name Name of the link group
     * @param links The links which belong to this group
     */
    constructor(args: ILinkGroup){
        this.name = args.name
        this.links = args.links
    }
}

export interface ILinkGroup{
    name: string;
    links: Array<Link>;
}