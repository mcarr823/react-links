/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { IHomeViewModel } from "viewmodels/HomeViewModel";

it("Home page", () => {

  let addGroupClicked = 0

  const model: IHomeViewModel = {
    groups:[],
    addGroup: () => { addGroupClicked++ },
    removeGroup: () => {},
    updateGroup: () => {},
  }

  render(<Page model={model}/>);
  expect(screen.getByRole("heading")).toHaveTextContent("Links");

  expect(addGroupClicked).toBe(0)
  screen.getByRole("addLinkGroupButton").click()
  expect(addGroupClicked).toBe(1)

  // The other two buttons are tested in the LinkGroupView.test.tsx file instead
  
});
