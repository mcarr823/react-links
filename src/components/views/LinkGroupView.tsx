import LinkGroup from "classes/LinkGroup";
import LinkView from "./LinkView"
import { Folder2Open, Pencil } from "react-bootstrap-icons"

/**
 * Component for displaying a group of links.
 *
 * Shows the group's name and all of its links.
 *
 * @param group LinkGroup object to display
 * @param edit Callback to invoke when the Edit button is clicked
 * @param openLinks Callback to invoke when the Open All button is clicked
 */
export default function LinkGroupView({
    group,
    edit,
    openLinks
} : {
    group: LinkGroup;
    edit: () => void;
    openLinks: () => void;
}){

    // For each link in the group, filter out any which don't have
    // a URL entered.
    // For the rest, display them as LinkView components.
    const linkViews = group.links
        .filter(l => l.url.length > 0)
        .map((l, i) => <LinkView key={i} link={l}/>)

    return (
        <div className="col col-xxl-3 col-xl-4 col-lg-6 col-sm-12 mb-3">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-6" role="linkGroupViewName">
                            {group.name}
                        </div>
                        <div className="col col-6">
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
                                onClick={openLinks}
                                title="Open All"
                                role="openAllLinkGroupButton"
                                >
                                <Folder2Open/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="list-group list-group-flush">
                        {linkViews}
                    </div>
                </div>
            </div>
        </div>
    )

}
