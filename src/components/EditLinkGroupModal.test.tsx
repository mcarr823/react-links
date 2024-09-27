/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import LinkGroup from "classes/LinkGroup";
import EditLinkGroupModal from "./EditLinkGroupModal";
import { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";

it("EditLinkGroupModal component - invisible", () => {

    const linkGroup = new LinkGroup({
        id:1,
        name:'test',
        links:[]
    })
    const removeGroup = () => {}
    const updateGroup = () => {}
    const model: IEditLinkGroupModalViewModel = {
        id: -1,
        visible: false,
        name: '',
        links: [],
        removeLink: () => {},
        addLink: () => {},
        show: () => {},
        hide: () => {},
        save: () => { return linkGroup },
    }

    render(<EditLinkGroupModal
        model={model}
        removeGroup={removeGroup}
        addOrUpdateGroup={updateGroup}
        />);

    let found = true
    try {
        screen.getByRole("EditLinkGroupModalDiv")
    } catch (error) {
        found = false
    }
    expect(found).toBe(false)
  
});


it("EditLinkGroupModal component - visible", () => {

    let removeButtonClicked = 0
    let updateButtonClicked = 0
    let cancelButtonClicked = 0
    let addButtonClicked = 0

    const linkGroup = new LinkGroup({
        id:1,
        name:'test',
        links:[]
    })
    const model: IEditLinkGroupModalViewModel = {
        id: linkGroup.id,
        visible: true,
        name: linkGroup.name,
        links: linkGroup.links,
        removeLink: () => {},
        addLink: () => { addButtonClicked++ },
        show: () => {},
        hide: () => { cancelButtonClicked++ },
        save: () => { return linkGroup },
    }

    render(<EditLinkGroupModal
        model={model}
        removeGroup={() => { removeButtonClicked++ }}
        addOrUpdateGroup={() => { updateButtonClicked++ }}
        />);

    expect(screen.getByRole("EditLinkGroupModalDiv")).toBeDefined()
    expect(model.visible).toBe(true)

    expect(removeButtonClicked).toBe(0)
    screen.getByRole("removeLinkGroupButton").click()
    expect(removeButtonClicked).toBe(1)

    // Should already be 1, because the remove button
    // also calls hide.
    expect(cancelButtonClicked).toBe(1)
    screen.getByRole("cancelLinkGroupButton").click()
    expect(cancelButtonClicked).toBe(2)

    expect(updateButtonClicked).toBe(0)
    screen.getByRole("saveLinkGroupButton").click()
    expect(updateButtonClicked).toBe(1)

    expect(addButtonClicked).toBe(0)
    screen.getByRole("addLinkButton").click()
    expect(addButtonClicked).toBe(1)
  
});
