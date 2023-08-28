import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchLabelTasks } from "../redux/tasks"
import getIcon from "../utils/getIcons"
import AddForm from "./AddForm"
const LabelTasks = () => {
    const { labelId } = useParams()
    console.log("labelId", labelId)
    const { labelTasks } = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLabelTasks(labelId))

        console.log("labelTasks", labelTasks)
    }, [labelId])

    return (
        <div className="w-screen h-screen p-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">{labelTasks.name}</h2>

                <div className="flex items-center text-sm font-bold justify-evenly">
                    <span>Settings</span>
                    <span>View</span>
                    {getIcon("more")}
                </div>
            </div>

            <hr />

            {labelTasks?.tasks?.map(task => {
                return <LabelTask task={task} />
            })}

            <AddForm />
        </div>
    )
}

export default LabelTasks

function LabelTask({ task }) {
    return (
        <div className="py-2 border-b-2 flex flex-col">
            <div className="flex items-center text-sm">
                <input
                    type="checkbox"
                    className={`w-4 h-4 rounded-full bg-transparent border-2  `}
                />
                <span className="ml-4">{task?.title}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
                <div>
                    {task.labels?.map(tag => {
                        return <span>{tag?.name}</span>
                    })}
                </div>

                <p>
                    {task?.project?.name}/{task?.section?.name}
                </p>
            </div>
        </div>
    )
}
