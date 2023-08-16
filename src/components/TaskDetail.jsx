import { useEffect } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { BsFlagFill } from "react-icons/bs"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { useDispatch } from "react-redux"
import { closeTaskDetailForm, updateTask } from "../redux/tasks"
import { useSelector } from "react-redux"
import Comment from "./Comment"
import Subtask from "./Subtask"
import { useState, useRef } from "react"
import PriorityModal from "./PriorityModal"
import Label from "./Label"
import LabelModal from "./LabelModal"
import { getPriorityColor } from "../config/helpers"
const TaskDetail = () => {
    const modalRef = useRef(null)
    // console.log("modalRef.current", modalRef.current)
    const [showCompleted, setShowCompleted] = useState(true)

    const dispatch = useDispatch()
    const { taskDetailModalContents } = useSelector(state => state.tasks)

    // console.log("taskDetailModalContents", taskDetailModalContents)

    // console.log("taskDetailModalContents", taskDetailModalContents)

    const {
        title,
        _id,
        desc,
        priority,
        dueDate,
        project,
        labels,
        subtasks,
        completedSubtasks,
        nonCompletedSubtasks,
    } = taskDetailModalContents

    const priorityClass = {
        1: "border-red-500",
        2: "border-yellow-700",
        3: "border-blue-600",
        4: "border-white-400",
    }

    const priorityClassName = priorityClass[priority] || "white"

    const [showPriorityModal, setShowPriorityModal] = useState(false)
    const [showLabelModal, setShowLabelModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(title)
    const [updatedDesc, setUpdatedDesc] = useState(desc)

    useEffect(() => {
        const closeModalOnOutsideClick = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowPriorityModal(false)
                setShowLabelModal(false)
                dispatch(updateTask({ id: _id, labels: ["wip", "qwe"] }))

                // dispatch()
            }
        }

        document.addEventListener("mousedown", closeModalOnOutsideClick)

        return () => {
            document.removeEventListener("mousedown", closeModalOnOutsideClick)
        }
    }, [])

    return (
        <div className="absolute top-22 left-42 text-white w-2/3 h-2/3 bg-gray-900 rounded-md">
            {showPriorityModal && (
                <div ref={modalRef}>
                    <PriorityModal
                        priority={priority}
                        setShowPriorityModal={setShowPriorityModal}
                        taskId={_id}
                    />
                </div>
            )}
            {showLabelModal && (
                <div ref={modalRef}>
                    <LabelModal
                        priority={priority}
                        showLabelModal={showLabelModal}
                        taskId={_id}
                    />
                </div>
            )}
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
                    <input
                        type="checkbox"
                        name="asdsa"
                        id="asdas"
                        className={`w-4 h-4 rounded-full bg-transparent border-2  border-${getPriorityColor(
                            priority
                        )}   ${showForm ? "opacity-60" : ""} `}
                        onChange={() => {}}
                        disabled={showForm ? "disabld" : ""}
                    />
                    {!showForm && (
                        <div
                            className=""
                            onClick={() => {
                                setShowForm(true)
                            }}
                        >
                            <div className=" p-3 rounded-md">
                                <h3 className="font-bold outline-none bg-transparent border-none">
                                    {title}
                                </h3>
                                <p className="py-4 text-sm">{desc}</p>
                            </div>
                        </div>
                    )}
                    {showForm && (
                        <form className="">
                            <div className="border-2 border-gray-100 p-3 rounded-md">
                                <input
                                    className="font-bold outline-none bg-transparent border-none"
                                    value={updatedTitle}
                                    onChange={e => {
                                        setUpdatedTitle(e.target.value)
                                    }}
                                />
                                <textarea
                                    className="py-4 text-sm w-full outline-none border-none bg-transparent"
                                    onChange={e => {
                                        setUpdatedDesc(e.target.value)
                                    }}
                                >
                                    {updatedDesc}
                                </textarea>
                            </div>

                            <div className="flex justify-end mt-3">
                                <button
                                    className="text-xs py-2 px-3 rounded-md bg-gray-700"
                                    onClick={e => {
                                        e.preventDefault()
                                        setShowForm(false)
                                        setUpdatedDesc(desc)
                                        setUpdatedTitle(title)
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="text-xs py-2  px-3 rounded-md bg-red-600  ml-3"
                                    onClick={e => {
                                        e.preventDefault()
                                        setShowForm(false)
                                        dispatch(
                                            updateTask({
                                                id: _id,
                                                title: updatedTitle,
                                                desc: updatedDesc,
                                            })
                                        )
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="text-xs flex items-center mt-10 justify-between">
                        <span>
                            <AiOutlinePlus className="inline mr-2" /> Add
                            sub-task
                        </span>
                        <button
                            className="hover:bg-slate-400 py-2 px-3 rounded-md bg-slate-700"
                            onClick={() => {
                                setShowCompleted(!showCompleted)
                            }}
                        >
                            {showCompleted ? "Hide" : "Show"} Completed
                        </button>
                    </div>

                    {nonCompletedSubtasks?.length > 0 && (
                        <div className="text-sm mt-3">
                            <p>
                                Sub-tasks{" "}
                                <span>
                                    {completedSubtasks.length}/{subtasks.length}
                                </span>
                            </p>
                            {nonCompletedSubtasks.map(subtask => {
                                return (
                                    <Subtask
                                        key={subtask._id}
                                        subtask={subtask}
                                    />
                                )
                            })}
                            <div className="text-xs flex items-center mt-4 justify-between">
                                <span>
                                    <AiOutlinePlus className="inline mr-2" />
                                    Add sub-task
                                </span>
                            </div>
                            <hr className="border text-gray-50 mt-4" />
                        </div>
                    )}
                    {showCompleted && completedSubtasks?.length > 0 && (
                        <div className="text-sm mt-3">
                            {completedSubtasks.map(subtask => {
                                return (
                                    <Subtask
                                        key={subtask._id}
                                        subtask={subtask}
                                        completed={true}
                                    />
                                )
                            })}

                            {/* <hr className="border text-gray-50 mt-4" /> */}
                        </div>
                    )}

                    <h3 className="mt-10">Comments</h3>
                    <hr className="mt-4" />

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
                    <p
                        className="text-xs flex justify-between hover:bg-slate-400 p-2 rounded-md cursor-pointer"
                        onClick={() => {
                            setShowPriorityModal(true)
                        }}
                    >
                        <span>
                            <BsFlagFill
                                className={`text-${getPriorityColor(
                                    priority
                                )} inline`}
                            />
                            <span className="ml-2">P{priority}</span>
                        </span>
                        <span>
                            <MdOutlineKeyboardArrowDown
                                className="inline "
                                fontSize={15}
                            />
                        </span>
                    </p>
                    <hr className="border text-gray-50 mt-3" />

                    <p
                        className="text-gray-300 py-3 flex justify-between cursor-pointer  hover:bg-slate-400"
                        onClick={() => {
                            setShowLabelModal(true)
                        }}
                    >
                        <span>Labels</span>
                        <span>
                            <AiOutlinePlus className="inline mr-2 " />
                        </span>
                    </p>

                    {labels?.map(label => {
                        return <Label name={label} />
                    })}

                    <p className="text-gray-300 py-3">Reminders</p>
                    <p className="text-gray-300 py-3">Location</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail
