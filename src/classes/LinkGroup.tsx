import ILinkGroup from "../interfaces/ILinkGroup";
import Link from "./Link";

/**
 * Represents a group of links.
 * 
 * TODO add other parameters, such as color, icon, etc.
 */
export default class LinkGroup implements ILinkGroup{

    id: number;
    name: string;
    links: Array<Link>;

    /**
     * @param name Name of the link group
     * @param links The links which belong to this group
     */
    constructor(args: ILinkGroup){
        this.id = args.id
        this.name = args.name
        this.links = args.links.map(l => new Link(l))
    }

    /**
     * Validates the LinkGroup by checking that none of the
     * fields are undefined.
     *
     * They could be undefined if the LinkGroup was cast from
     * a JSON object, for example.
     *
     * @return true if the link group is valid, otherwise false.
     */
    validate(): boolean {
        return typeof this.id !== 'undefined' &&
                typeof this.name !== 'undefined' &&
                typeof this.links !== 'undefined'
    }

    clone(): LinkGroup{
        return new LinkGroup(this)
    }

    /**
     * Exports the each link in Onetab's format, then puts them all
     * in a newline-delimited string.
     * 
     * @returns Newline-delimited string of links in the Onetab format
     */
    exportOnetab(): string {
        return this.links.map(l => l.exportOnetab()).join("\n")
    }

    /**
     * Converts a tab group from Onetab into a LinkGroup.
     * 
     * @param str String containing one or more newline-delimited Onetab tabs
     * @returns A LinkGroup object
     */
    static importOnetab(str: string) : LinkGroup {
        const links = str.split("\n")
                        .filter(line => line.length > 0)
                        .map(Link.importOnetab)
        return new LinkGroup({
            id:0,
            name:'',
            links
        })
    }

}
