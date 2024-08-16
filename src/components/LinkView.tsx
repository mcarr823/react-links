import Link from "classes/Link"

export default function LinkView(args: ILinkView){

    const { link } = args
    const { name, url } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon

    return (
        <a
            href={url}
            className="list-group-item list-group-item-action"
            target="_blank"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                {url}
            </div>
        </a>
    )

}

interface ILinkView{
    link: Link;
}