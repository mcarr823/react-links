/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import HomeViewModel, { IHomeViewModel } from "viewmodels/HomeViewModel";
import LinkGroup, { ILinkGroup } from "classes/LinkGroup";
import Link from "classes/Link";

it("Home page", () => {

  const id = 123
  const name = "test name"
  const links: Array<Link> = [
      new Link({
          name:'link1',
          url:'url1',
          favicon:'favicon1'
      }),
      new Link({
          name:'link2',
          url:'url2',
          favicon:'favicon2'
      }),
  ]
  const linkGroups: ILinkGroup = { id, name, links }

  const groups = [
    new LinkGroup(linkGroups)
  ]
  const addGroup = () => {
    groups.push(new LinkGroup({ id:0, name:'', links:[] }))
  }
  const removeGroup = (i: number) => {}
  const updateGroup = (i: number, linkGroup: LinkGroup) => {}
  const addLink = (i: number) => {}
  const removeLink = (group: number, link: number) => {}
  const model: IHomeViewModel = {
    groups,
    addGroup,
    removeGroup,
    updateGroup,
    addLink,
    removeLink
  }

  render(<Page model={model}/>);
  expect(screen.getByRole("heading")).toHaveTextContent("Links");

  expect(groups.length).toBe(1)
  screen.getByRole("addLinkButton").click()
  expect(groups.length).toBe(2)
  
});
