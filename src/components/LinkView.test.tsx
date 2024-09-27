/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Link from "classes/Link";
import LinkView from "./LinkView";

it("LinkView component", () => {

    const link = new Link({
        name:'link1',
        url:'url1',
        favicon:'favicon1'
    })

    render(<LinkView link={link}/>);

    expect(screen.getByRole("linkViewName")).toHaveTextContent(link.name);
    expect(screen.getByRole("linkViewUrl")).toHaveTextContent(link.url);
  
});
