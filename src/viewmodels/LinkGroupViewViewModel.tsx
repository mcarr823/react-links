import Link from "classes/Link";
import LinkGroup from "classes/LinkGroup";
import { useState } from "react";

export default function LinkGroupViewViewModel(
    initialValue: LinkGroup
) : ILinkGroupViewViewModel{

    const [editMode, setEditMode] = useState<boolean>(false)
    const [group, setGroup] = useState<LinkGroup>(initialValue)

    const openAll = () => {
        group.links.forEach(l => window.open(l.url))
        // TODO find a way to prompt the user for permission before running this code
    }

    const addLink = () => {
        const link = new Link({
            name: 'New Link',
            url: '',
            favicon: ''
        })
        group.links.push(link)
    }

    const removeLink = (link: number) => {
        group.links.splice(link, 1)
    }

    const reset = () => {
        setGroup(initialValue.clone())
    }

    return {
        editMode, setEditMode,
        group,
        removeLink,
        addLink,
        openAll,
        reset
    }

}

export interface ILinkGroupViewViewModel{
    editMode: boolean;
    setEditMode: (newValue: boolean) => void;
    group: LinkGroup;
    removeLink: (i: number) => void;
    addLink: () => void;
    openAll: () => void;
    reset: () => void;
}