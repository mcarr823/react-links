import LinkGroup from "classes/LinkGroup";
import LinkView from "./LinkView"
import { Check, Folder2Open, Pencil, Plus, Trash, X } from "react-bootstrap-icons"
import LinkGroupViewViewModel, { ILinkGroupViewViewModel } from "viewmodels/LinkGroupViewViewModel"

export default function LinkGroupView({
    initialLinkGroup,
    model = LinkGroupViewViewModel(initialLinkGroup),
    removeGroup,
    updateGroup
} : {
    initialLinkGroup: LinkGroup;
    model: ILinkGroupViewViewModel;
    removeGroup: () => void;
    updateGroup: (linkGroup: LinkGroup) => void;
}){

    const { name, links } = model.group

    const linkViews = links.map((l, i) => (
        <LinkView
            key={i}
            link={l}
            isEditing={model.editMode}
            removeLink={() => model.removeLink(i)}
        />
    ))

    return (
        <div className="col col-xxl-3 col-xl-4 col-lg-6 col-sm-12 mb-3">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-6" role="linkGroupViewName">
                            {name}
                        </div>
                        <div className="col col-6">
                            <ActionButtons model={model} updateGroup={updateGroup}/>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="list-group list-group-flush">
                        {linkViews}
                    </div>
                </div>
                <Footer model={model} removeGroup={removeGroup}/>
            </div>
        </div>
    )

}

function ActionButtons({
    model,
    updateGroup
} : {
    model: ILinkGroupViewViewModel
    updateGroup: (linkGroup: LinkGroup) => void;
}){

    const edit = () => {
        model.setEditMode(true)
    }
    const cancel = () => {
        model.reset()
        model.setEditMode(false)
    }
    const save = () => {
        updateGroup(model.group)
        model.setEditMode(false)
    }

    const { editMode, openAll } = model

    if (editMode){
        return (
            <>
                <button
                    className="btn btn-outline-danger ms-1"
                    onClick={cancel}
                    title="Cancel"
                    role="cancelLinkGroupButton"
                    >
                    <X/>
                </button>
                <button
                    className="btn btn-outline-success ms-1"
                    onClick={save}
                    title="Save"
                    role="saveLinkGroupButton"
                    >
                    <Check/>
                </button>
            </>
        )
    }

    return (
        <>
            <button
                className="btn btn-outline-warning ms-1"
                onClick={edit}
                title="Edit"
                role="editLinkGroupButton"
                >
                <Pencil/>
            </button>
            <button
                className="btn btn-outline-primary ms-1"
                onClick={openAll}
                title="Open All"
                role="openAllLinkGroupButton"
                >
                <Folder2Open/>
            </button>
        </>
    )
}

function Footer({
    model,
    removeGroup
} : {
    model: ILinkGroupViewViewModel
    removeGroup: () => void;
}){

    const { editMode, addLink } = model

    if (!editMode){
        return (<></>)
    }

    return (
        <div className="card-footer">
            <button
                className="btn btn-outline-danger ms-1"
                onClick={removeGroup}
                title="Remove"
                role="removeLinkGroupButton"
                >
                <Trash/> Delete Link Group
            </button>
            <button
                className="btn btn-outline-success ms-1"
                onClick={addLink}
                title="Add Link"
                role="addLinkButton"
                >
                <Plus/> Add Link
            </button>
        </div>
    )

}