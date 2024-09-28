import { ILinkGroup } from "classes/LinkGroup";

/**
 * Interface defining the expected format of a LinkGroup PUT request.
 */
export default interface IPutLinkGroupRequest{

	/**
	 * LinkGroup to save,
	 */
    linkGroup: ILinkGroup;

}