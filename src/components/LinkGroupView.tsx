import LinkGroup from "classes/LinkGroup"
import LinkView from "./LinkView"

export default function LinkGroupView(args: ILinkGroupView){

    const { group } = args
    const { name, links } = group

    const linkViews = links.map(l => (<LinkView key={l.url} link={l}/>))

    return (
        <div className="card">
            <div className="card-header">
                {name}
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {linkViews}
                </ul>
            </div>
        </div>
    )

}

interface ILinkGroupView{
    group: LinkGroup;
}