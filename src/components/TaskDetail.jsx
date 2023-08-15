import { AiOutlinePlus } from "react-icons/ai"
import { BsFlagFill } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { closeTaskDetailForm } from "../redux/tasks"

import { useSelector } from "react-redux"
import Comment from "./Comment"
import Subtask from "./Subtask"
const TaskDetail = () => {
    const dispatch = useDispatch()
    const { taskDetailModalContents } = useSelector(state => state.tasks)

    console.log("taskDetailModalContents", taskDetailModalContents)

    // console.log("taskDetailModalContents", taskDetailModalContents)

    const { title, desc, priority, dueDate, project, labels, subtasks } =
        taskDetailModalContents

    const priorityClass = {
        1: "text-red-400",
        2: "text-yellow-400",
        3: "text-blue-400",
        4: "text-white-400",
    }

    const priorityClassName = priorityClass[priority] || "white"
    console.log("priorityClassName", priorityClassName)

    return (
        <div className="absolute top-22 left-42 text-white w-2/3 h-2/3 bg-gray-900 rounded-md">
            <div className="w-full bg-gray-500 p-3 min-h-fit flex justify-between text-xs">
                <span>{project} / [SECTION-NAME] </span>
                <span
                    onClick={() => {
                        dispatch(closeTaskDetailForm())
                    }}
                >
                    close
                </span>
            </div>
            <div className="w-full flex h-full ">
                <div className="left-section w-4/6  bg-gray-200 p-5 ">
                    <form className="">
                        <div className="border border-white p-3 rounded-md">
                            <h3>{title}</h3>
                            <p className="py-4 text-sm">{desc}</p>
                        </div>

                        <div className="flex justify-end mt-3">
                            <button className="text-xs py-2 px-2 rounded-md bg-gray-700">
                                Cancel
                            </button>
                            <button className="text-xs py-2  px-2 rounded-md bg-red-500 ml-3">
                                Save
                            </button>
                        </div>

                        <div className="text-xs flex items-center mt-4">
                            <AiOutlinePlus className="inline mr-2" /> Add
                            sub-task
                        </div>

                        {subtasks.length > 0 && (
                            <div className="text-sm mt-3">
                                <p>
                                    Sub-tasks <span>0/1</span>{" "}
                                </p>
                                {subtasks.map(subtask => {
                                    return (
                                        <Subtask
                                            key={subtask._id}
                                            subtask={subtask}
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </form>

                    <hr className="mt-10" />

                    <div className="comment-container overflow-y-scroll">
                        <Comment />
                        {/* <Comment /> */}
                    </div>
                </div>
                <div className="right-section w-2/6  bg-gray-300 p-5 text-sm">
                    <p className="text-gray-300 py-3">Project</p>
                    <p className="text-xs">{project}</p>
                    <hr className="border text-gray-50" />

                    <p className="text-gray-300 py-3">Due date</p>
                    <p className="text-xs">{dueDate}</p>
                    <hr className="border text-gray-50" />

                    <p className="text-gray-300 py-3">Priority</p>
                    <p className="text-xs">
                        P{priority} <BsFlagFill className={priorityClassName} />
                    </p>
                    <hr className="border text-gray-50" />

                    <p className="text-gray-300 py-3">Labels</p>

                    <p className="text-gray-300 py-3">Reminders</p>
                    <p className="text-gray-300 py-3">Location</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail
