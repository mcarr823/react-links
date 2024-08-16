import LinkGroup from "classes/LinkGroup"
import LinkView from "./LinkView"
import { Folder2Open, Pencil } from "react-bootstrap-icons"

export default function LinkGroupView(args: ILinkGroupView){

    const { group } = args
    const { name, links } = group

    const linkViews = links.map(l => (<LinkView key={l.url} link={l}/>))
    const openAll = () => {
        // TODO
    }
    const edit = () => {
        // TODO
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
                            <button
                                className="btn btn-outline-warning ms-1"
                                onClick={edit}
                                >
                                <Pencil/>
                            </button>
                            <button
                                className="btn btn-outline-primary ms-1"
                                onClick={openAll}
                                >
                                <Folder2Open/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="list-group">
                        {linkViews}
                    </div>
                </div>
            </div>
        </div>
    )

}

interface ILinkGroupView{
    group: LinkGroup;
}