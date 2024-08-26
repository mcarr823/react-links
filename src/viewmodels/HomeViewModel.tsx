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

    const addGroup = () => {
        const ids = groups.map(l => l.id)
        const biggestId = Math.max(...ids)
        const linkGroup = new LinkGroup({
            id: biggestId + 1,
            name: 'New Group',
            links: []
        })
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

    const updateGroup = (i: number, linkGroup: LinkGroup) => {
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

    const removeGroup = (i: number) => {
        const id = groups[i].id
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


    return {
        groups,
        addGroup,
        removeGroup,
        updateGroup
    }

}

export interface IHomeViewModel{
    groups: Array<LinkGroup>;
    addGroup: () => void;
    removeGroup: (i: number) => void;
    updateGroup: (i: number, linkGroup: LinkGroup) => void;
}