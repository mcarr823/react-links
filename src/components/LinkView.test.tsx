/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Link from "classes/Link";
import LinkView from "./LinkView";

it("LinkView component in editing mode", () => {

    let removeButtonClicked = 0

    const link = new Link({
        name:'link1',
        url:'url1',
        favicon:'favicon1'
    })
    const removeLink = () => {
        removeButtonClicked++
    }

    render(<LinkView link={link} isEditing={true} removeLink={removeLink}/>);

    expect(screen.getByRole("linkViewName")).toHaveValue(link.name);
    expect(screen.getByRole("linkViewUrl")).toHaveValue(link.url);

    expect(removeButtonClicked).toBe(0)
    screen.getByRole("removeLinkButton").click()
    expect(removeButtonClicked).toBe(1)
  
});

it("LinkView component in normal mode", () => {

    const link = new Link({
        name:'link1',
        url:'url1',
        favicon:'favicon1'
    })
    const removeLink = () => {}

    render(<LinkView link={link} isEditing={false} removeLink={removeLink}/>);

    expect(screen.getByRole("linkViewName")).toHaveTextContent(link.name);
    expect(screen.getByRole("linkViewUrl")).toHaveTextContent(link.url);
  
});
