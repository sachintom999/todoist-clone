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
        <div className="mt-4">
            <p className="textfont-bold text-sm my-4">Favourites</p>
            {favourites?.projects?.map(project => (
                <SidebarItem
                    key={project._id}
                    item={project}
                    itemType="project"
                />
            ))}
            {favourites?.labels?.map(label => (
                <SidebarItem key={label._id} item={label} itemType="label" />
            ))}
        </div>
    )
}

export default FavouriteList
