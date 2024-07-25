"use client"

import LinkGroupView from "@/components/LinkGroupView";
import Link from "classes/Link";
import LinkGroup, { ILinkGroup } from "classes/LinkGroup";
import HomeViewModel from "viewmodels/HomeViewModel";

export default function Page() {

  const model = HomeViewModel()

  const linkGroups = model.groups.map(g => (<LinkGroupView group={g} />))

  return (
    <div className="container">{linkGroups}</div>
  )

}
