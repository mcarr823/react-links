import LinkGroup from "classes/LinkGroup"
import LinkView from "./LinkView"
import { Check, Folder2Open, Pencil, Plus, Trash, X } from "react-bootstrap-icons"
import { useState } from "react"

export default function LinkGroupView(args: ILinkGroupView){

    const [editMode, setEditMode] = useState<boolean>(false)

    const { group, removeGroup, updateGroup, removeLink, addLink } = args
    const { name, links } = group

    const linkViews = links.map((l, i) => (
        <LinkView
            key={i}
            link={l}
            isEditing={editMode}
            removeLink={() => removeLink(i)}
        />
    ))
    const openAll = () => {
        links.forEach(l => window.open(l.url))
        // TODO find a way to prompt the user for permission before running this code
    }
    const edit = () => {
        setEditMode(true)
    }
    const cancel = () => {
        setEditMode(false)
    }
    const save = () => {
        updateGroup()
        setEditMode(false)
    }

    return (
        <div className="col col-xxl-3 col-xl-4 col-lg-6 col-sm-12 mb-3">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-6">
                            {name}
                        </div>
                        <div className="col col-6">
                            <ActionButtons
                                isEditing={editMode}
                                edit={edit}
                                openAll={openAll}
                                cancel={cancel}
                                save={save}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="list-group list-group-flush">
                        {linkViews}
                    </div>
                </div>
                <Footer
                    isEditing={editMode}
                    removeGroup={removeGroup}
                    addLink={addLink}
                />
            </div>
        </div>
    )

}

function ActionButtons(args: IActionButtons){

    const { isEditing, edit, openAll, cancel, save } = args

    if (isEditing){
        return (
            <>
                <button
                    className="btn btn-outline-danger ms-1"
                    onClick={cancel}
                    title="Cancel"
                    >
                    <X/>
                </button>
                <button
                    className="btn btn-outline-success ms-1"
                    onClick={save}
                    title="Save"
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
                >
                <Pencil/>
            </button>
            <button
                className="btn btn-outline-primary ms-1"
                onClick={openAll}
                title="Open All"
                >
                <Folder2Open/>
            </button>
        </>
    )
}

function Footer(args : IFooter){

    const { isEditing, removeGroup, addLink } = args

    if (!isEditing){
        return (<></>)
    }

    return (
        <div className="card-footer">
            <button
                className="btn btn-outline-danger ms-1"
                onClick={removeGroup}
                title="Remove"
                >
                <Trash/> Delete Link Group
            </button>
            <button
                className="btn btn-outline-success ms-1"
                onClick={addLink}
                title="Add Link"
                >
                <Plus/> Add Link
            </button>
        </div>
    )

}

interface ILinkGroupView{
    group: LinkGroup;
    removeGroup: () => void;
    updateGroup: () => void;
    removeLink: (i: number) => void;
    addLink: () => void;
}

interface IActionButtons{
    isEditing: boolean;
    edit: () => void;
    openAll: () => void;
    cancel: () => void;
    save: () => void;
}

interface IFooter{
    isEditing: boolean;
    removeGroup: () => void;
    addLink: () => void;
}