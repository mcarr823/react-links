import Link from "classes/Link"

export default function LinkView(args: ILinkView){

    const { link } = args
    const { name, url } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                {url}
            </div>
        </li>    
    )

}

interface ILinkView{
    link: Link;
}