import Link from "./Link"
import ILink from "../interfaces/ILink"

/**
 * If a favicon is not defined, then getFavicon() should return
 * an empty string.
 */
test("Empty favicon", () => {
    
    const args: ILink = {
        name:'GitHub',
        url:'https://github.com',
        favicon:''
    }
    const l = new Link(args)

    expect(l.name).toBe(args.name)
    expect(l.url).toBe(args.url)
    expect(l.favicon).toBe(args.favicon)
    expect(l.getFavicon()).toBe("")

})

/**
 * If a favicon is defined, then it should be prepended with a
 * file path.
 */
test("Actual favicon", () => {
    
    const args: ILink = {
        name:'GitHub',
        url:'https://github.com',
        favicon:'favicon.ico'
    }
    const l = new Link(args)

    expect(l.name).toBe(args.name)
    expect(l.url).toBe(args.url)
    expect(l.favicon).toBe(args.favicon)
    expect(l.getFavicon()).toBe("/data/favicons/favicon.ico")

})

/**
 * Export a link in onetab format and check if it matches our expectations.
 */
test("Onetab export", () => {
    
    const args: ILink = {
        name:'GitHub',
        url:'https://github.com',
        favicon:''
    }
    const l = new Link(args)

    expect(l.exportOnetab()).toBe(`${args.url} | ${args.name}`)

})