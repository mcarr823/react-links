import { ILinkGroup } from "classes/LinkGroup";

/**
 * Interface defining the expected format of a LinkGroup PATCH request.
 */
export default interface IPatchLinkGroupRequest{

	/**
	 * LinkGroup to save,
	 */
    linkGroup: ILinkGroup;

}