/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import SimpleInput from "./SimpleInput";

it("SimpleInput component", () => {

    let textValue = ""
    const setValue = (newValue: string) => {
        textValue = newValue
    }

    render(
        <SimpleInput
            value={textValue}
            setValue={setValue}
            role="SimpleInput"
            />
    );

    const input = screen.getByRole("SimpleInput")
    expect(input).toBeDefined()

    expect(textValue).toBe("");
    fireEvent.change(input, {target: {value: 'test'}})
    expect(textValue).toBe("test");
  
});
