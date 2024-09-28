import Link from "../classes/Link";


export default interface ILinkGroup {

    /**
     * Sequential ID number used to uniquely identify this LinkGroup.
     */
    id: number;

    /**
     * Name of this LinkGroup.
     * eg. "Streaming services" or "Game websites"
     *
     * Duplicates are allowed. So are empty strings.
     */
    name: string;

    /**
     * Array of links contained within this LinkGroup.
     *
     * An empty list is allowed.
     */
    links: Array<Link>;

}
