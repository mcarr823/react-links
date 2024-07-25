import Link from "classes/Link"
import LinkGroup, { ILinkGroup } from "classes/LinkGroup"

export const dynamic = 'force-dynamic' // defaults to auto

/**
 * Hard-coded test data for now.
 * TODO actual implementation
 * 
 * @returns An array of LinkGroup objects
 */
export async function GET(request: Request) {

    const link1 = new Link({
        name:'GitHub',
        url:'https://github.com',
        favicon:''
    })
    const link2 = new Link({
        name:'Bitbucket',
        url:'https://bitbucket.com',
        favicon:''
    })
    const links = [link1, link2]
    const args: ILinkGroup = {
        name:"My link group",
        links
    }
    const group = new LinkGroup(args)
    const groups = [group]

    return Response.json(groups)

}


