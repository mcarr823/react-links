import Link from "classes/Link"
import { Trash } from "react-bootstrap-icons"

export default function EditLinkView(args: IEditLinkView){

    const { link, removeLink } = args
    const { name, url } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon
    // TODO update name and url in parent when they're changed

    return (
        <div className="list-group-item mt-2">
            <div className="row">
                <div className="col-2">
                    <button
                        className="btn btn-outline-danger ms-1"
                        onClick={removeLink}
                        title="Remove"
                        role="removeLinkButton"
                        >
                        <Trash/>
                    </button>
                </div>
                <div className="col-4">
                    <input className="form-control" defaultValue={name} role="editLinkViewName" placeholder="Website Name"/>
                </div>
                <div className="col-6">
                    <input className="form-control" defaultValue={url} role="editLinkViewUrl" placeholder="URL"/>
                </div>
            </div>
        </div>
    )

}

interface IEditLinkView{
    link: Link;
    removeLink: () => void;
}