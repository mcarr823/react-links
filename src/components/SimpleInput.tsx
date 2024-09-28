import { ChangeEventHandler } from "react";

/**
 * A simple input element with bootstrap styling.
 * 
 * This is intended for use with a setter and getter from a viewmodel
 * or from a useState variable, and aims to simplify the implementation
 * of ChangeEventHandler.
 * 
 * eg.
 * const [selectedValue, setSelectedValue] = useState("")
 * return (
 *  <SimpleInput
 *   id="test"
 *   role="MyElementRole"
 *   value={selectedValue}
 *   setValue={setSelectedValue}/>
 * )
 * 
 * @param id Unique identifier for this element
 * @param role Role used to identify the element for unit testing purposes
 * @param placeholder Placeholder string to display when no text is entered
 * @param value Default value to display. Can be a state variable from useState
 * @param setValue Callback to invoke when the text changes. Sends back a string
 * @returns A styled <input> node
 */
export default function SimpleInput(args: {
    id?: string | undefined;
    role?: string | undefined;
    placeholder?: string | undefined;
    value: string | number;
    setValue: (value: string) => void;
}){
    
    const setValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        args.setValue(event.target.value)
    }

    return (
        <input
            className="form-control"
            id={args.id}
            type="text"
            defaultValue={args.value}
            onChange={setValue}
            role={args.role}
            placeholder={args.placeholder}
            />
    )
}
