import Link from "classes/Link"
import { Trash } from "react-bootstrap-icons"

export default function LinkView(args: ILinkView){

    const { link, isEditing, removeLink } = args
    const { name, url } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon
    // TODO update name and url in parent when they're changed

    if (isEditing){
        return (
            <div className="list-group-item">
                <div className="ms-2 me-auto">
                    <input className="form-control" defaultValue={name} role="linkViewName"/>
                    <input className="form-control" defaultValue={url} role="linkViewUrl"/>
                </div>
                <button
                    className="btn btn-outline-danger ms-1"
                    onClick={removeLink}
                    title="Remove"
                    role="removeLinkButton"
                    >
                    <Trash/>
                </button>
            </div>
        )
    }

    return (
        <a
            href={url}
            className="list-group-item list-group-item-action"
            target="_blank"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold" role="linkViewName">{name}</div>
                <div role="linkViewUrl">{url}</div>
            </div>
        </a>
    )

}

interface ILinkView{
    link: Link;
    isEditing: boolean;
    removeLink: () => void;
}