import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProjects } from "../../redux/tasks"
import SidebarItem from "./SidebarItem"
const ProjectList = () => {
    const dispatch = useDispatch()

    const { projects } = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(fetchAllProjects())
    }, [])

    return (
        <div>
            {projects?.map(project => (
                <SidebarItem
                    key={project._id}
                    item={project}
                    itemType="project"
                />
            ))}
        </div>
    )
}

export default ProjectList
