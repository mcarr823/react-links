/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import SimpleSelect from "./SimpleSelect";

it("SimpleSelect component", () => {

    let textValue = ""
    const setValue = (newValue: string) => {
        textValue = newValue
    }

    render(
        <SimpleSelect
            value={textValue}
            setValue={setValue}
            role="SimpleSelect"
            >
                <option value="">Default</option>
                <option value="test">Test</option>
        </SimpleSelect>
    );

    const input = screen.getByRole("SimpleSelect")
    expect(input).toBeDefined()

    expect(textValue).toBe("");
    fireEvent.change(input, {target: {value: 'test'}})
    expect(textValue).toBe("test");
  
});
