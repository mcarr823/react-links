import Link from "classes/Link"
import { Trash } from "react-bootstrap-icons"
import SimpleInput from "./SimpleInput";

/**
 * Component for editing a single Link.
 *
 * Shows the link's name and URL as input fields.
 *
 * @param link Link object to edit
 * @param removeLink Callback to invoke when the Remove button is pressed
 */
export default function EditLinkView({
    link,
    updateLink,
    removeLink
}: {
    link: Link;
    updateLink: (newLink: Link) => void;
    removeLink: () => void;
}){

    const { name, url, favicon } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon
    // TODO update name and url in parent when they're changed

    // Callback to invoke when the Name input value is modified.
    // Generates a new Link class and passes it to the updateLink callback.
    const onChangeName = (value: string) => {
        const newLink = new Link({ name:value, url, favicon })
        updateLink(newLink)
    }

    // Callback to invoke when the URL input value is modified.
    // Generates a new Link class and passes it to the updateLink callback.
    const onChangeUrl = (value: string) => {
        const newLink = new Link({ name, url:value, favicon })
        updateLink(newLink)
    }

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
                    <SimpleInput
                        value={name}
                        setValue={onChangeName}
                        role="editLinkViewName"
                        placeholder="Name"
                        />
                </div>
                <div className="col-6">
                    <SimpleInput
                        value={url}
                        setValue={onChangeUrl}
                        role="editLinkViewUrl"
                        placeholder="URL"
                        />
                </div>
            </div>
        </div>
    )

}