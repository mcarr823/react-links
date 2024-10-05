import LinkGroup from "classes/LinkGroup"
import IDeleteLinkGroupRequest from "interfaces/IDeleteLinkGroupRequest"
import IPatchLinkGroupRequest from "interfaces/IPatchLinkGroupRequest"
import IPutLinkGroupRequest from "interfaces/IPutLinkGroupRequest"
import { useEffect, useState } from "react"

export default function HomeViewModel(): IHomeViewModel {

    const [groups, setGroups] = useState<Array<LinkGroup>>([])
    const [loading, setLoading] = useState<boolean>(true)

    // Effect to download all of the linkgroups from the server
    // when the viewmodel first loads.
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

    const addGroup = (linkGroup: LinkGroup) => {

        // If there's at least one existing group, then start by
        // finding the largest ID out of the existing linkgroup entries.
        // Add 1 to it in order to make a new sequential ID.
        // If not, just set the ID to 1, since it's the first linkgroup.
        if (groups.length > 0){
            const ids = groups.map(l => l.id)
            const biggestId = Math.max(...ids)
            linkGroup.id = biggestId + 1
        }else{
            linkGroup.id = 1
        }

        // Add the new linkgroup to the end of the array
        setGroups([
            ...groups,
            linkGroup
        ])
        
        // Send a PUT request to the server
        const req: IPutLinkGroupRequest = { linkGroup }
        fetch("/api/link", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => res.json())

    }

    const updateGroup = (linkGroup: LinkGroup) => {

        // Find the index of the group to update
        const i = groups.findIndex(g => g.id == linkGroup.id)

        // Rebuild the array, substituting the entry at index `i`
        // with the new entry.
        setGroups([
            ...groups.slice(0,i),
            linkGroup,
            ...groups.slice(i+1)
        ])
        
        // Send a PATCH request to the server
        const req: IPatchLinkGroupRequest = { linkGroup }
        fetch("/api/link", {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => res.json())

    }

    const addOrUpdateGroup = (linkGroup: LinkGroup) => {

        // If the linkGroup has an ID of -1, then it must be
        // new, so add it to the array.
        // If it has a different ID, then it's an existing group,
        // so update it instead.
        if (linkGroup.id == -1)
            addGroup(linkGroup)
        else
            updateGroup(linkGroup)

    }

    const removeGroup = (id: number) => {
        
        // Find the index of the group to remove
        const i = groups.findIndex(g => g.id == id)

        // Rebuild the array without the item at that index
        setGroups([
            ...groups.slice(0,i),
            ...groups.slice(i+1)
        ])
        
        // Send a DELETE request to the server
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

    /**
     * Array of link groups to display on the home page.
     */
    groups: Array<LinkGroup>;

    /**
     * Callback used to either create a new link group,
     * or to update an existing one.
     *
     * @param linkGroup New linkgroup object to either add
     * to the array, or to replace an existing array entry.
     */
    addOrUpdateGroup: (linkGroup: LinkGroup) => void;

    /**
     * Callback used to remove a group from the array.
     *
     * @param id Unique ID used to identify the group to remove.
     */
    removeGroup: (id: number) => void;

    /**
     * Callback used to open all of the links within a given
     * linkgroup object at once.
     *
     * @param i Index of the linkgroup for which to open all
     * of its links.
     */
    openAll: (i: number) => void;

}