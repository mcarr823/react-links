/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { IHomeViewModel } from "viewmodels/HomeViewModel";
import { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";
import LinkGroup from "classes/LinkGroup";

it("Home page", () => {

  let addGroupClicked = 0

  const model: IHomeViewModel = {
    groups:[],
    addOrUpdateGroup: () => {},
    removeGroup: () => {},
    openAll: () => {}
  }

  const linkGroup = new LinkGroup({
    id:1,
    name:'test',
    links:[]
})
  const editModel: IEditLinkGroupModalViewModel = {
    id: -1,
    visible: false,
    name: '',
    setName: () => {},
    links: [],
    removeLink: () => {},
    updateLink: () => {},
    addLink: () => {},
    show: () => { addGroupClicked++ },
    hide: () => {},
    save: () => { return linkGroup },
}

  render(<HomePage model={model} editModel={editModel}/>);
  expect(screen.getByRole("heading")).toHaveTextContent("Links");

  expect(addGroupClicked).toBe(0)
  screen.getByRole("addLinkGroupButton").click()
  expect(addGroupClicked).toBe(1)

  // The other buttons are tested in the LinkGroupView.test.tsx file instead
  
});
