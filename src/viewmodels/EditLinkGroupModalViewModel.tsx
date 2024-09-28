import Link from "classes/Link"
import LinkGroup from "classes/LinkGroup"
import { useState } from "react"

/**
 * Creates a viewmodel for use with the EditLinkGroupModal component.
 * 
 * This model contains all of the fields necessary to create a new
 * linkgroup object, or to update an existing one.
 * 
 * @returns An instance of IEditLinkGroupModalViewModel
 * 
 * @see EditLinkGroupModal
 * @see IEditLinkGroupModalViewModel
 */
export default function EditLinkGroupModalViewModel(): IEditLinkGroupModalViewModel {

    const [id, setId] = useState<number>(-1)
    const [name, setName] = useState<string>("")
    const [links, setLinks] = useState<Array<Link>>([])
    const [visible, setVisible] = useState<boolean>(false)

    const addLink = () => {
        const link = new Link({
            name: '',
            url: '',
            favicon: ''
        })
        setLinks([
            ...links,
            link
        ])
    }

    const updateLink = (i: number, link: Link) => {
        setLinks([
            ...links.splice(0, i),
            link,
            ...links.splice(i+1)
        ])
    }

    const removeLink = (link: number) => {
        setLinks([
            ...links.splice(0, link),
            ...links.splice(link+1)
        ])
    }

    
    const show = (group: LinkGroup | null) => {
        if (group){
            setId(group.id)
            setName(group.name)
            setLinks(group.links)
        }else{
            // Start with one empty link
            const emptyLink = new Link({ name:'', url:'', favicon:'' })
            setId(-1)
            setName("")
            setLinks([emptyLink])
        }
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    const save = () => {
        return new LinkGroup({
            id,
            name,
            links
        })
    }

    return {
        id,
        visible,
        name, setName,
        links,
        removeLink,
        updateLink,
        addLink,
        show, hide,
        save
    }

}

export interface IEditLinkGroupModalViewModel{

    /**
     * ID of the LinkGroup being displayed by this modal.
     * 
     * The id should be -1 if the link group doesn't already
     * exist. ie. If we're creating a new link group.
     */
    id: number;

    /**
     * If true, the modal is displayed. If false, it is not.
     */
    visible: boolean;

    /**
     * The name given to the link group displayed by this modal.
     */
    name: string;

    /**
     * Updates the value of `name`, replacing it with `newValue`.
     * 
     * @param newValue New name for this linkgroup.
     */
    setName: (newValue: string) => void;

    /**
     * The current array of links being displayed on the modal.
     */
    links: Array<Link>;

    /**
     * Removes the link at index `i` from the modal.
     * 
     * @param i Index of the link to remove
     */
    removeLink: (i: number) => void;

    /**
     * Replaces the link at index `i`.
     * 
     * @param i Index of the link to update
     * @param link New link to replace the old one with
     */
    updateLink: (i: number, link: Link) => void;

    /**
     * Adds a new blank link to the modal, for which the user can
     * then enter a name and url.
     */
    addLink: () => void;
    
    /**
     * Causes the EditLinkGroupModal to become visible
     * and sets the group for it to display.
     * 
     * @param group LinkGroup to modify, or null if
     * you want to add a new group.
     */
    show: (group: LinkGroup | null) => void;

    /**
     * Dismisses the EditLinkGroupModal.
     */
    hide: () => void;

    /**
     * Saves the name, links, etc. displayed on the modal and
     * creates a new LinkGroup object based on those fields.
     * 
     * This function does not create or update a LinkGroup object
     * in the back-end. It only saves the form data in the format
     * of a LinkGroup object.
     * 
     * That object should then be sent to the back-end in some
     * other way to actually persist the changes.
     * 
     * @returns A new LinkGroup created from the other form fields
     */
    save: () => LinkGroup;
}