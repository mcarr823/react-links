"use client";

import EditLinkGroupModal from "components/views/EditLinkGroupModal";
import LinkGroupView from "components/views/LinkGroupView";
import { Plus } from "react-bootstrap-icons";
import { IEditLinkGroupModalViewModel } from "viewmodels/EditLinkGroupModalViewModel";
import { IHomeViewModel } from "viewmodels/HomeViewModel";

/**
 * The main/home page of the website.
 *
 * @param model Viewmodel for this page which contains the link groups and
 * functions shown and used by this page.
 * @param editModel Viewmodel used by the popup which is shown when adding or
 * modifying a link group.
 */
export default function HomePage({
  model, editModel
}: {
  model: IHomeViewModel;
  editModel: IEditLinkGroupModalViewModel;
}) {

  const linkGroups = model.groups.map((g, i) => {
    return (
      <LinkGroupView
        key={i}
        group={g}
        edit={() => editModel.show(g)}
        openLinks={() => model.openAll(i)} />
    );
  });

  return (
    <div className="ms-3 me-3 p-3">
      <h2 className="p-3" role="heading">Links</h2>
      <button
        className="btn btn-outline-success"
        onClick={() => { editModel.show(null); }}
        title="Add New Link Group"
        role="addLinkGroupButton"
        data-bs-toggle="modal"
      ><Plus /> New Link Group</button>
      <div className="row mt-3" role="linkGroups">
        {linkGroups}
      </div>

      <EditLinkGroupModal
        model={editModel}
        removeGroup={model.removeGroup}
        addOrUpdateGroup={model.addOrUpdateGroup} />
    </div>
  );

}
