import LinkGroup from "classes/LinkGroup"
import IDeleteLinkGroupRequest from "interfaces/IDeleteLinkGroupRequest"
import IPatchLinkGroupRequest from "interfaces/IPatchLinkGroupRequest"
import IPutLinkGroupRequest from "interfaces/IPutLinkGroupRequest"
import { useEffect, useState } from "react"

export default function HomeViewModel(): IHomeViewModel {

    const [groups, setGroups] = useState<Array<LinkGroup>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (loading){
            setLoading(false)
            fetch("/api/links", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
            .then((groupArr: Array<LinkGroup>) => setGroups(groupArr))
        }
    }, [loading])

    const findGroup = (linkGroup: LinkGroup) : number => {
        const index = groups.findIndex(g => g.id == linkGroup.id)
        if (index == -1)
            throw new Error("Group not found")
        else
            return index
    }

    const addGroup = (linkGroup: LinkGroup) => {
        const ids = groups.map(l => l.id)
        const biggestId = Math.max(...ids)
        linkGroup.id = biggestId + 1
        setGroups([
            ...groups,
            linkGroup
        ])
        
        const req: IPutLinkGroupRequest = { linkGroup }
        fetch("/api/link", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => res.json())
    }

    const updateGroup = (linkGroup: LinkGroup) => {

        const i = findGroup(linkGroup)

        setGroups([
            ...groups.slice(0,i),
            linkGroup,
            ...groups.slice(i+1)
        ])
        
        const req: IPatchLinkGroupRequest = { linkGroup }
        fetch("/api/link", {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => res.json())
    }

    const addOrUpdateGroup = (linkGroup: LinkGroup) => {
        if (linkGroup.id == -1)
            addGroup(linkGroup)
        else
            updateGroup(linkGroup)
    }

    const removeGroup = (id: number) => {
        
        const i = groups.findIndex(g => g.id == id)

        setGroups([
            ...groups.slice(0,i),
            ...groups.slice(i+1)
        ])
        
        const req: IDeleteLinkGroupRequest = { id }
        fetch("/api/link", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => res.json())
    }

    const openAll = (i: number) => {
        groups[i].links
            .filter(l => l.url.length > 0)
            .forEach(l => window.open(l.url))
        // TODO find a way to prompt the user for permission before running this code
    }


    return {
        groups,
        addOrUpdateGroup,
        removeGroup,
        openAll
    }

}

export interface IHomeViewModel{
    groups: Array<LinkGroup>;
    addOrUpdateGroup: (linkGroup: LinkGroup) => void;
    removeGroup: (id: number) => void;
    openAll: (i: number) => void;
}