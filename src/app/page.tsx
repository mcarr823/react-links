"use client"

import LinkGroupView from "@/components/LinkGroupView";
import { Plus } from "react-bootstrap-icons";
import HomeViewModel, { IHomeViewModel } from "viewmodels/HomeViewModel";
import LinkGroupViewViewModel from "viewmodels/LinkGroupViewViewModel";

export default function Page({
  model = HomeViewModel()
} : {
  model: IHomeViewModel
}) {

  const linkGroups = model.groups.map((g, i) => {
    return (
      <LinkGroupView
        key={i}
        initialLinkGroup={g}
        removeGroup={() => model.removeGroup(i)}
        updateGroup={() => model.updateGroup(i, g)}
      />
    )
  })

  return (
    <div className="ms-3 me-3 p-3">
      <h2 className="p-3" role="heading">Links</h2>
      <button
        className="btn btn-outline-success"
        onClick={model.addGroup}
        title="Add New Link Group"
        role="addLinkGroupButton"
      ><Plus/> New Link Group</button>
      <div className="row mt-3" role="linkGroups">
        {linkGroups}
      </div>
    </div>
  )

}
