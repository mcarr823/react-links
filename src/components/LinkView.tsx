import Link from "classes/Link"

export default function LinkView(args: ILinkView){

    const { link } = args
    const { name, url } = link
    // const favicon = link.getFavicon()
    // TODO implement favicon
    // TODO update name and url in parent when they're changed

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
}