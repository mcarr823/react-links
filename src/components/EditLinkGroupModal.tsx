import LinkGroup from "classes/LinkGroup";
import { Check, Plus, Trash } from "react-bootstrap-icons"
import { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";
import EditLinkView from "./EditLinkView";

export default function EditLinkGroupModal({
    model,
    addOrUpdateGroup,
    removeGroup
} : {
    model: IEditLinkGroupModalViewModel;
    addOrUpdateGroup: (linkGroup: LinkGroup) => void;
    removeGroup: (id: number) => void;
}){

    if (!model.visible){
        return (<></>)
    }

    const save = () => {
        const linkGroup = model.save()
        addOrUpdateGroup(linkGroup)
        model.hide()
    }

    const remove = () => {
        removeGroup(model.id)
        model.hide()
    }

    const linkViews = model.links.map((l, i) => (
        <EditLinkView
            key={i}
            link={l}
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
                            <label htmlFor="exampleFormControlInput1" className="form-label">Group name</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" defaultValue={model.name}/>
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