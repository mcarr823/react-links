import Link from "./Link"
import LinkGroup from "./LinkGroup"
import ILinkGroup from "../interfaces/ILinkGroup"
import ILink from "interfaces/ILink"

/**
 * A basic test to make sure that the constructor works as intended.
 */
test("Constructor test", () => {

    const link1: ILink = {
        name:'GitHub',
        url:'https://github.com',
        favicon:''
    }
    const link2: ILink = {
        name:'Bitbucket',
        url:'https://bitbucket.com',
        favicon:''
    }
    const links = [link1, link2]
    const args: ILinkGroup = {
        id: 1,
        name:"My link group",
        links
    }
    const group = new LinkGroup(args)

    expect(group.name).toBe(args.name)
    expect(group.links.length).toBe(links.length)
    expect(group.id).toBe(1)

    // The links should have been converted from ILink to Link
    expect(group.links[0]).toBeInstanceOf(Link)
    expect(group.links[1]).toBeInstanceOf(Link)

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

    const args = {
        links:Array<ILink>()
    } as ILinkGroup
    const group = new LinkGroup(args)
    const valid = group.validate()

    expect(valid).toBe(false)

})

/**
 * Export a single linkgroup in onetab format.
 */
test("Onetab export", () => {

    const link1: ILink = {
        name:'GitHub',
        url:'https://github.com',
        favicon:''
    }
    const link2: ILink = {
        name:'Bitbucket',
        url:'https://bitbucket.com',
        favicon:''
    }
    const links = [link1, link2]
    const args: ILinkGroup = {
        id: 1,
        name:"My link group",
        links
    }
    const group = new LinkGroup(args)

    const expectedString = `${link1.url} | ${link1.name}\n`+
                            `${link2.url} | ${link2.name}`
    expect(group.exportOnetab()).toBe(expectedString)

})

/**
 * Export multiple linkgroups in onetab format.
 */
test("Onetab export", () => {

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
    const group2 = new LinkGroup(args)
    const groups = [group, group2]
    const result = groups.map(g => g.exportOnetab()).join("\n\n")

    const expectedString = `${link1.url} | ${link1.name}\n`+
                            `${link2.url} | ${link2.name}\n\n`+
                            `${link1.url} | ${link1.name}\n`+
                            `${link2.url} | ${link2.name}`
    expect(result).toBe(expectedString)

})