"use client"

import EditLinkGroupModalViewModel from "viewmodels/EditLinkGroupModalViewModel";
import HomeViewModel from "viewmodels/HomeViewModel";
import HomePage from "../pages/HomePage";

export default function Page() {

  const model = HomeViewModel()
  const editModel = EditLinkGroupModalViewModel()

  return (<HomePage model={model} editModel={editModel}/>)
  
}
