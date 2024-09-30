import LinkGroup from "classes/LinkGroup";
import { Check, Plus, Trash } from "react-bootstrap-icons"
import { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";
import EditLinkView from "./EditLinkView";
import SimpleInput from "./SimpleInput";

/**
 * Popup used for adding or modifying a linkgroup.
 *
 * @param model Viewmodel containing the group name, links, and functions
 * for adding or editing a viewmodel.
 * @param addOrUpdateGroup Callback to invoke when the Save button is pressed.
 * @param removeGroup Callback to invoke when the Remove button is pressed.
 */
export default function EditLinkGroupModal({
    model,
    addOrUpdateGroup,
    removeGroup
} : {
    model: IEditLinkGroupModalViewModel;
    addOrUpdateGroup: (linkGroup: LinkGroup) => void;
    removeGroup: (id: number) => void;
}){

    // If the model isn't visible right now, just return an empty node.
    if (!model.visible){
        return (<></>)
    }

    // Callback for the Save button.
    // Saves a snapshot of the linkgroup which is being edited,
    // passed it back to the addOrUpdateGroup callback, then hides
    // the modal.
    const save = () => {
        const linkGroup = model.save()
        addOrUpdateGroup(linkGroup)
        model.hide()
    }

    // Callback for the Remove Group button.
    // Removes the group, then hides the modal.
    const remove = () => {
        removeGroup(model.id)
        model.hide()
    }

    const linkViews = model.links.map((l, i) => (
        <EditLinkView
            key={i}
            link={l}
            updateLink={(newLink) => { model.updateLink(i, newLink) }}
            removeLink={() => model.removeLink(i)}
        />
    ))

    return (
        <div
            className="modal"
            tabIndex={-1}
            style={{ display:"block", background:"#0007" }}
            role="EditLinkGroupModalDiv"
            >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editing Link Group</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={model.hide}
                            role="cancelLinkGroupButton"
                            ></button>
                    </div>
                    <div className="modal-body">
                    
                        <div className="mb-3">
                            <SimpleInput
                                value={model.name}
                                setValue={model.setName}
                                placeholder="Group name"
                                role="editLinkGroupName"
                                />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Links</label>
                            <br/>
                            <button
                                className="btn btn-outline-success ms-1 mt-1 mb-3"
                                onClick={model.addLink}
                                title="New Link"
                                role="addLinkButton"
                                >
                                <Plus/> New Link
                            </button>
                        </div>

                        {linkViews}

                    </div>
                    <div className="modal-footer">
                        <div className="row" style={{ width:"100%" }}>
                            <div className="col-6">
                                <button
                                    className="btn btn-outline-danger ms-1"
                                    onClick={remove}
                                    title="Remove"
                                    role="removeLinkGroupButton"
                                    >
                                    <Trash/> Delete Link Group
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-outline-success ms-1"
                                    onClick={save}
                                    title="Save"
                                    role="saveLinkGroupButton"
                                    >
                                    <Check/> Save Link Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}