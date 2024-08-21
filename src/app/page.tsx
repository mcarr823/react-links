"use client"

import LinkGroupView from "@/components/LinkGroupView";
import { Plus } from "react-bootstrap-icons";
import HomeViewModel from "viewmodels/HomeViewModel";

export default function Page() {

  const model = HomeViewModel()

  const linkGroups = model.groups.map((g, i) => (
    <LinkGroupView
      key={i}
      group={g}
      removeGroup={() => model.removeGroup(i)}
      removeLink={(link) => model.removeLink(i, link)}
      addLink={() => model.addLink(i)}
      updateGroup={() => model.updateGroup(i, g)}
    />
  ))

  return (
    <div className="ms-3 me-3 p-3">
      <h2 className="p-3">Links</h2>
      <button
        className="btn btn-outline-success"
        onClick={model.addGroup}
        title="Add New Link Group"
      ><Plus/> New Link Group</button>
      <div className="row mt-3">
        {linkGroups}
      </div>
    </div>
  )

}
