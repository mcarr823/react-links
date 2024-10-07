import { ChangeEventHandler } from "react";

/**
 * A simple select element with bootstrap styling.
 * 
 * This is intended for use with a setter and getter from a viewmodel
 * or from a useState variable, and aims to simplify the implementation
 * of ChangeEventHandler.
 * 
 * eg.
 * const [selectedValue, setSelectedValue] = useState("")
 * return (
 *  <SimpleSelect
 *   id="test"
 *   role="MyElementRole"
 *   value={selectedValue}
 *   setValue={setSelectedValue}>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 *   <option value="3">Option 3</option>
 *  </SimpleSelect>
 * )
 * 
 * @param id Unique identifier for this element
 * @param role Role used to identify the element for unit testing purposes
 * @param value Default value to display. Can be a state variable from useState
 * @param setValue Callback to invoke when the text changes. Sends back a string
 * @param children Child <option> nodes for the select element
 * @returns A styled <input> node
 */
export default function SimpleSelect(args: {
    id?: string | undefined;
    role?: string | undefined;
    value: string | number;
    setValue: (value: string) => void;
    children: React.ReactNode;
}){
    
    const setValue: ChangeEventHandler<HTMLSelectElement> = (event) => {
        args.setValue(event.target.value)
    }

    return (
        <select
            className="form-select"
            id={args.id}
            value={args.value}
            onChange={setValue}
            role={args.role}
            >
            {args.children}
        </select>
    )
}
