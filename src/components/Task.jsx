import { AiOutlineBranches } from "react-icons/ai"
import { IoIosMore } from "react-icons/io"
import { BiComment } from "react-icons/bi"
import { BsCalendar3 } from "react-icons/bs"
import { useDispatch } from "react-redux"
import {
    completeTask,
    fetchTaskDetail,
    openTaskDetailForm,
} from "../redux/tasks"

const Task = ({
    task: {
        title,
        desc,
        _id,
        dueDate,
        project,
        completedSubtasksCount,
        nonCompletedSubtasksCount,
        subtasks,
        priority,
    },
}) => {
    const dispatch = useDispatch()

    const priorityClass = {
        1: "border-red-700",
        2: "border-yellow-700",
        3: "border-blue-600",
        4: "border-white-400",
    }

    const priorityClassName = priorityClass[priority] || "white"

    const markComplete = () => {
        dispatch(completeTask({ id: _id }))
    }

    const options = {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }

    const currentTime = new Date()

    const timeClassName =
        new Date(dueDate) < currentTime ? "text-red-400" : "text-green-400"

    return (
        <div
            className="bg-dark1 p-3 mt-4 mb-4 cursor-pointer rounded-md border-solid border-slate-700 shadow-gray-700 shadow-sm border"
            onClick={() => {
                dispatch(fetchTaskDetail(_id)).then(() => {
                    dispatch(openTaskDetailForm(_id))
                })
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <input
                        type="checkbox"
                        name="asdsa"
                        id="asdas"
                        className={`w-4 h-4 rounded-full bg-transparent border-2 ${priorityClassName}`}
                        onChange={markComplete}
                    />

                    <span className="ml-2 text-sm">{title}</span>
                </div>
                <div className="hover:bg-gray-400 px-1">
                    <IoIosMore />
                </div>
            </div>
            <div className="my-2">
                <p className="text-xs">{desc}</p>
            </div>
            <div className=" flex justify-between mt-2 text-xs items-center">
                {subtasks.length > 0 && (
                    <>
                        <span>
                            <AiOutlineBranches
                                fontSize={10}
                                className="inline"
                            />
                        </span>
                        <span className="text-xs">
                            {completedSubtasksCount}/{nonCompletedSubtasksCount}
                        </span>
                    </>
                )}
                <span>
                    <BiComment fontSize={10} />
                </span>

                <span className={timeClassName}>
                    <BsCalendar3 fontSize={10} className="inline" />{" "}
                    {new Date(dueDate).toLocaleString("en-US", options)}
                </span>
                <span className="">{project}</span>
            </div>
        </div>
    )
}

export default Task