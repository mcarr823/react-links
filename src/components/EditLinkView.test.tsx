/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Link from "classes/Link";
import EditLinkView from "./EditLinkView";

it("EditLinkView component", () => {

    let removeButtonClicked = 0

    const link = new Link({
        name:'link1',
        url:'url1',
        favicon:'favicon1'
    })
    const removeLink = () => {
        removeButtonClicked++
    }
    const updateLink = () => {}

    render(
        <EditLinkView
            link={link}
            removeLink={removeLink}
            updateLink={updateLink}
            />
    );

    expect(screen.getByRole("editLinkViewName")).toHaveValue(link.name);
    expect(screen.getByRole("editLinkViewUrl")).toHaveValue(link.url);

    expect(removeButtonClicked).toBe(0)
    screen.getByRole("removeLinkButton").click()
    expect(removeButtonClicked).toBe(1)
  
});
