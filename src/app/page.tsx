"use client"

import EditLinkGroupModal from "@/components/EditLinkGroupModal";
import LinkGroupView from "@/components/LinkGroupView";
import { Plus } from "react-bootstrap-icons";
import EditLinkGroupModalViewModel, { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";
import HomeViewModel, { IHomeViewModel } from "viewmodels/HomeViewModel";

export default function Page({
  model = HomeViewModel(),
  editModel = EditLinkGroupModalViewModel()
} : {
  model: IHomeViewModel;
  editModel: IEditLinkGroupModalViewModel;
}) {

  const linkGroups = model.groups.map((g, i) => {
    return (
      <LinkGroupView
        key={i}
        group={g}
        edit={() => editModel.show(g)}
        openLinks={() => model.openAll(i)}
      />
    )
  })

  return (
    <div className="ms-3 me-3 p-3">
      <h2 className="p-3" role="heading">Links</h2>
      <button
        className="btn btn-outline-success"
        onClick={() => { editModel.show(null) }}
        title="Add New Link Group"
        role="addLinkGroupButton"
        data-bs-toggle="modal"
      ><Plus/> New Link Group</button>
      <div className="row mt-3" role="linkGroups">
        {linkGroups}
      </div>

      <EditLinkGroupModal
        model={editModel}
        removeGroup={ model.removeGroup }
        addOrUpdateGroup={ model.addOrUpdateGroup }
        />
    </div>
  )

}
