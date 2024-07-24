import Link from "./Link"
import LinkGroup, { ILinkGroup } from "./LinkGroup"

/**
 * A basic test to make sure that the constructor works as intended.
 */
test("Constructor test", () => {

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

    expect(group.name).toBe(args.name)
    expect(group.links).toBe(links)

})