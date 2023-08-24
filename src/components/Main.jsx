import { useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { getInboxTasks, getProjectTasks, getTodayTasks } from "../redux/tasks"
import Section from "./Section"
import TaskDetail from "./TaskDetail"
import { useParams } from "react-router-dom"



const Main = ({ title, taskList }) => {
    const { projectId } = useParams()
    console.log("projectId", projectId)
    // const sections = ["Today"]

    const { todaySections, taskDetailOpen, pageTasks } = useSelector(
        state => state.tasks
    )

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(getTodayTasks(taskList))

        if (projectId) {
            dispatch(getProjectTasks(projectId))
        } else {
            dispatch(getInboxTasks())
        }
    }, [projectId])

    return (
        <div className="flex flex-col bg-blue-200 py-10 px-8 h-screen w-screen ">
            <div className="px-5  flex justify-between  ">
                <h2 className="text-white font-bold">{title}</h2>
                <div className="text-white  flex cursor-pointer">
                    <GiSettingsKnobs className="rotate-90" fontSize={20} />
                    <span className="text-sm ml-2">View</span>
                </div>
            </div>

            <div className="flex">
                {/* <Draggable> */}
                    {pageTasks?.map(section => {
                        // console.log("section", section)
                        return (
                            <Section
                                key={section?._id?.sectionName}
                                title={section?._id?.sectionName}
                                tasks={section?.tasks}
                            />
                            // <Section
                            //     key={section?._id?.sectionId}
                            //     title={section?._id?.sectionName}
                            //     tasks={section?._id?.tasks}

                            // />
                        )
                    })}
                {/* </Draggable> */}
            </div>
            {taskDetailOpen && <TaskDetail />}
        </div>
    )
}

export default Main
