import { defaultModalStyle } from "setup/constants";

/**
 * Modal which is shown when some kind of operation is
 * being performed in the background.
 * eg. While performing an AJAX request.
 * 
 * The modal cannot be dismissed.
 * It will continue to be displayed until the other process
 * has finished and dismissed it by changing the value of `show`.
 * 
 * This is intended to be used with a viewmodel which manages
 * the state of the `show` variable.
 * eg.
 * const [requestInProgress, setRequestInProgress] = useState<boolean>(false)
 * <ProgressModal title="Loading" message="Please wait" show={requestInProgress}/>
 * 
 * @param title String to display at the top of the modal
 * @param message Message to display above the spinner
 * @param show If true, the modal is shown. If false, it is hidden
 * @returns A modal div displaying a progress message
 */
export default function ProgressModal(args : {
    title: string;
    message: string;
    show: boolean;
}){

    // If `show` is false, just return an empty tag, effectively hiding
    // the modal.
    if (!args.show){
        return (<></>)
    }

    return (
        <div className="modal" tabIndex={-1} style={defaultModalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{args.title}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{args.message}</p>
                        <p>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}