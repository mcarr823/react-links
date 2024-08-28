/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import LinkGroupView from "./LinkGroupView";
import LinkGroup from "classes/LinkGroup";
import { ILinkGroupViewViewModel } from "viewmodels/LinkGroupViewViewModel";

it("LinkGroupView component - editing disabled", () => {

    let editButtonClicked = 0
    let openAllButtonClicked = 0

    const linkGroup = new LinkGroup({
        id:1,
        name:'test',
        links:[]
    })
    const removeGroup = () => {}
    const updateGroup = () => {}
    const model: ILinkGroupViewViewModel = {
        editMode:false,
        setEditMode:() => { editButtonClicked++ },
        group:linkGroup,
        removeLink:() => {},
        addLink:() => {},
        openAll:() => { openAllButtonClicked++ },
        reset:() => {}
    }

    render(<LinkGroupView
        initialLinkGroup={linkGroup}
        model={model}
        removeGroup={removeGroup}
        updateGroup={updateGroup}
        />);

    expect(screen.getByRole("linkGroupViewName")).toHaveTextContent(linkGroup.name);

    expect(editButtonClicked).toBe(0)
    screen.getByRole("editLinkGroupButton").click()
    expect(editButtonClicked).toBe(1)

    expect(openAllButtonClicked).toBe(0)
    screen.getByRole("openAllLinkGroupButton").click()
    expect(openAllButtonClicked).toBe(1)
  
});


it("LinkGroupView component - editing enabled", () => {

    let removeButtonClicked = 0
    let updateButtonClicked = 0
    let cancelButtonClicked = 0
    let addButtonClicked = 0

    const linkGroup = new LinkGroup({
        id:1,
        name:'test',
        links:[]
    })
    const removeGroup = () => {
        removeButtonClicked++
    }
    const updateGroup = () => {
        updateButtonClicked++
    }
    const model: ILinkGroupViewViewModel = {
        editMode:true,
        setEditMode:() => {},
        group:linkGroup,
        removeLink:() => {},
        addLink:() => { addButtonClicked++ },
        openAll:() => {},
        reset:() => { cancelButtonClicked++ }
    }

    render(<LinkGroupView
        initialLinkGroup={linkGroup}
        model={model}
        removeGroup={removeGroup}
        updateGroup={updateGroup}
        />);

    expect(screen.getByRole("linkGroupViewName")).toHaveTextContent(linkGroup.name);

    expect(removeButtonClicked).toBe(0)
    screen.getByRole("removeLinkGroupButton").click()
    expect(removeButtonClicked).toBe(1)

    expect(cancelButtonClicked).toBe(0)
    screen.getByRole("cancelLinkGroupButton").click()
    expect(cancelButtonClicked).toBe(1)

    expect(updateButtonClicked).toBe(0)
    screen.getByRole("saveLinkGroupButton").click()
    expect(updateButtonClicked).toBe(1)

    expect(addButtonClicked).toBe(0)
    screen.getByRole("addLinkButton").click()
    expect(addButtonClicked).toBe(1)
  
});
