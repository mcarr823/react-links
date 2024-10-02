import Link from "./Link"
import LinkGroup from "./LinkGroup"
import ILinkGroup from "../interfaces/ILinkGroup"

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
        id: 1,
        name:"My link group",
        links
    }
    const group = new LinkGroup(args)

    expect(group.name).toBe(args.name)
    expect(group.links).toBe(links)
    expect(group.id).toBe(1)

})

/**
 * Tests the validate function of the LinkGroup class.
 * Expects the validation to succeed.
 */
test("Validation success", () => {

    const args: ILinkGroup = {
        id: 1,
        name:"My link group",
        links:[]
    }
    const group = new LinkGroup(args)
    const valid = group.validate()

    expect(valid).toBe(true)

})

/**
 * Tests the validate function of the LinkGroup class.
 * Expects the validation to fail.
 */
test("Validation failure", () => {

    const args = {} as ILinkGroup
    const group = new LinkGroup(args)
    const valid = group.validate()

    expect(valid).toBe(false)

})