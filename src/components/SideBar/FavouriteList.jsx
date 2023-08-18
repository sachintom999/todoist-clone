import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFavourites } from "../../redux/tasks"
import SidebarItem from "./SidebarItem"
const FavouriteList = () => {
    const dispatch = useDispatch()

    const { favourites } = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(fetchAllFavourites())
    }, [])

    return (
        <div>
            {favourites?.projects?.map(project => (
                <SidebarItem item={project} itemType="project" />
            ))}
            {favourites?.labels?.map(label => (
                <SidebarItem item={label} itemType="label" />
            ))}
        </div>
    )
}

export default FavouriteList
