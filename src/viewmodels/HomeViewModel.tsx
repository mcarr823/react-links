import LinkGroup from "classes/LinkGroup"
import { useEffect, useState } from "react"

export default function HomeViewModel(): IHomeViewModel {

    const [groups, setGroups] = useState<Array<LinkGroup>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (loading){
            fetch("/api/links", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                //body: JSON.stringify({ time: new Date().toISOString() }),
            }).then(res => res.json())
            .then((groupArr: Array<LinkGroup>) => setGroups(groupArr))
        }
    }, [loading])


    return {
        groups
    }

}

interface IHomeViewModel{
    groups: Array<LinkGroup>;
}