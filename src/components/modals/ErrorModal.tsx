import { defaultModalStyle } from "setup/constants";

/**
 * Modal which is shown in response to an error message.
 * 
 * It displays if `error` is not empty, and hides itself by
 * setting `error` to empty again.
 * 
 * This is intended to be used with a viewmodel which manages
 * the state of the error variable.
 * eg.
 * const [error, setError] = useState<boolean>(false)
 * <ErrorModal error={error} setError={setError}/>
 * 
 * @param error Error message to display
 * @param setError Callback to set the value of `error`
 * @returns A modal div if `error` is defined, or an empty
 * tag if `error` is empty
 */
export default function ErrorModal(args : {
    error: string;
    setError: (value: string) => void;
}){

    // Function to hide the modal in response to clicking the Close button.
    const hide = () => {
        args.setError("")
    }

    // If the error is empty, just return an empty tag, effectively hiding
    // the modal.
    if (args.error.length == 0){
        return (<></>)
    }

    return (
        <div className="modal" tabIndex={-1} style={defaultModalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                    </div>
                    <div className="modal-body">
                        <p>{args.error}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={hide}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )

}