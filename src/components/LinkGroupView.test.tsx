/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import LinkGroupView from "./LinkGroupView";
import LinkGroup from "classes/LinkGroup";

it("LinkGroupView component", () => {

    let editButtonClicked = 0
    let openAllButtonClicked = 0

    const linkGroup = new LinkGroup({
        id:1,
        name:'test',
        links:[]
    })

    render(<LinkGroupView
        group={linkGroup}
        edit={() => { editButtonClicked++ }}
        openLinks={() => { openAllButtonClicked++ }}
        />);

    expect(screen.getByRole("linkGroupViewName")).toHaveTextContent(linkGroup.name);

    expect(editButtonClicked).toBe(0)
    screen.getByRole("editLinkGroupButton").click()
    expect(editButtonClicked).toBe(1)

    expect(openAllButtonClicked).toBe(0)
    screen.getByRole("openAllLinkGroupButton").click()
    expect(openAllButtonClicked).toBe(1)
  
});
