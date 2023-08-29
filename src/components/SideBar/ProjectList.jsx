import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProjects, updateaddProjectModal } from "../../redux/tasks"
import SidebarItem from "./SidebarItem"
import getIcon from "../../utils/getIcons"
const ProjectList = () => {
    const dispatch = useDispatch()

    const { projects } = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(fetchAllProjects())
    }, [])

    return (
        <div>
            <p className="textfont-bold text-sm my-4">
                Projects
                {getIcon("plus", {
                    fontSize: 16,
                    className: "ml-6 cursor-pointer hover:bg-slate-700",
                    onClick: () => {
                        dispatch(updateaddProjectModal({ show: true }))
                    },
                })}
            </p>
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
