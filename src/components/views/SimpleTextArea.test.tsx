/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import SimpleTextArea from "./SimpleTextArea";

it("SimpleTextArea component", () => {

    let textValue = ""
    const setValue = (newValue: string) => {
        textValue = newValue
    }

    render(
        <SimpleTextArea
            value={textValue}
            setValue={setValue}
            role="SimpleTextArea"
            />
    );

    const input = screen.getByRole("SimpleTextArea")
    expect(input).toBeDefined()

    expect(textValue).toBe("");
    fireEvent.change(input, {target: {value: 'test'}})
    expect(textValue).toBe("test");
  
});
