import LinkGroupView from "@/components/LinkGroupView";
import Link from "classes/Link";
import LinkGroup, { ILinkGroup } from "classes/LinkGroup";

export const metadata = {
  title: "App Router",
};

export default function Page() {

  const link1 = new Link({
    name:'GitHub',
    url:'https://github.com',
    favicon:''
})
const link2 = new Link({
    name:'Bitbucket',
    url:'https://bitbucket.com',
    favicon:''
})
const links = [link1, link2]
const args: ILinkGroup = {
    name:"My link group",
    links
}
const group = new LinkGroup(args)

  return <div><LinkGroupView group={group} /></div>;
}
