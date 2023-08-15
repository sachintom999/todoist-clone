import { useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { getTodayTasks } from "../redux/tasks"
import Section from "./Section"
import TaskDetail from "./TaskDetail"

const Main = ({ title, taskList }) => {
    // const sections = ["Today"]

    const { todaySections, taskDetailOpen } = useSelector(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodayTasks(taskList))
    }, [])

    return (
        <div className="flex flex-col bg-dark2 py-10 px-8 h-screen w-screen ">
            <div className="px-5  flex justify-between  ">
                <h2 className="text-white font-bold">{title}</h2>
                <div className="text-white  flex cursor-pointer">
                    <GiSettingsKnobs className="rotate-90" fontSize={20} />
                    <span className="text-sm ml-2">View</span>
                </div>
            </div>

            <div className="flex">
                {todaySections?.map(section => {
                    // return <Section key={section} title={section} />
                    return (
                        <Section
                            key={section.name}
                            title={section.name}
                            tasks={section.tasks}
                        />
                    )
                })}
            </div>
            {taskDetailOpen && <TaskDetail />}
        </div>
    )
}

export default Main
