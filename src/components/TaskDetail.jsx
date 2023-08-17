import { useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { AiOutlineBranches, AiOutlinePlus } from "react-icons/ai"
import { MdKeyboardArrowRight } from "react-icons/md"
import { TbSection } from "react-icons/tb"

import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    closeTaskDetailForm,
    updateTask,
    updatetaskDetailModalState,
} from "../redux/tasks"
import PriorityModal from "./PriorityModal"
import Subtask from "./Subtask"

import { getPriorityColor } from "../config/helpers"
import AddForm from "./AddForm"
import CommentsContainer from "./CommentsContainer"
import LabelContainer from "./LabelContainer"
import LabelModal from "./LabelModal"
import PriorityContainer from "./PriorityContainer"
import ParentTask from "./ParentTask"
const TaskDetail = () => {
    const modalRef = useRef(null)
    // console.log("modalRef.current", modalRef.current)
    const [showCompleted, setShowCompleted] = useState(true)

    const dispatch = useDispatch()
    const { taskDetailModalContents } = useSelector(state => state.tasks)

    console.log("taskDetailModalContents", taskDetailModalContents)

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
        section,
        comments,
        parentTask,
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
        dispatch(updatetaskDetailModalState({ labels }))

        const closeModalOnOutsideClick = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowPriorityModal(false)
                setShowLabelModal(false)
                dispatch(
                    updateTask({
                        id: _id,
                        // labels: taskDetailModalContents.labels,
                        labels: [
                            "64ddb9c0aaa93e44ec74999b",
                            "64ddb99aaaa93e44ec74999a",
                        ],
                    })
                )

                // dispatch()
            }
        }

        document.addEventListener("mousedown", closeModalOnOutsideClick)

        return () => {
            document.removeEventListener("mousedown", closeModalOnOutsideClick)
        }
    }, [])

    return (
        <div className="absolute top-3 left-42 text-white w-2/3 h-3/4 bg-gray-900 rounded-md z-20 border-4 border-white">
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
                <span>
                    {project?.name} /{" "}
                    <TbSection className="inline text-gray-800" fontSize={20} />{" "}
                    {section?.name}
                </span>
                <span
                    onClick={() => {
                        dispatch(closeTaskDetailForm())
                    }}
                >
                    close
                </span>
            </div>
            <div className="w-full flex h-full ">
                <div className="left-section w-4/6  bg-gray-200 p-5 overflow-y-auto ">
                    {parentTask && <ParentTask parentTask={parentTask} />}
                    <input
                        type="checkbox"
                        name="asdsa"
                        id="asdas"
                        className={`w-4 h-4 rounded-full bg-transparent border-2  border-${getPriorityColor(
                            priority
                        )}   ${showForm ? "opacity-60" : ""} `}
                        onChange={() => {}}
                        disabled={showForm ? "disabled" : ""}
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
                        {subtasks?.length === 0 && (
                            <span>
                                <AiOutlinePlus className="inline mr-2" /> Add
                                sub-task
                            </span>
                        )}
                    </div>

                    {nonCompletedSubtasks?.length > 0 && (
                        <div className="text-sm mt-3">
                            <p className="flex justify-between items-center">
                                <span>
                                    Sub-tasks
                                    <span className="text-xs ml-2">
                                        {completedSubtasks?.length}/
                                        {subtasks?.length}
                                    </span>
                                    ...
                                    <div className="w-8 h-8">
                                        <CircularProgressbar
                                            value={25}
                                            strokeWidth={150}
                                            styles={buildStyles({
                                                strokeLinecap: "butt",
                                            })}
                                        />
                                    </div>
                                </span>
                                {completedSubtasks?.length > 0 && (
                                    <button
                                        className="hover:bg-slate-400 py-2 px-3 rounded-md bg-slate-700 text-xs"
                                        onClick={() => {
                                            setShowCompleted(!showCompleted)
                                        }}
                                    >
                                        {showCompleted ? "Hide" : "Show"}{" "}
                                        Completed
                                    </button>
                                )}
                            </p>
                            {nonCompletedSubtasks?.map(subtask => {
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
                            {/* <AddTaskForm /> */}
                            <AddForm />
                        </div>
                    )}
                    {showCompleted && completedSubtasks?.length > 0 && (
                        <div className="text-sm mt-3">
                            {completedSubtasks?.map(subtask => {
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

                    {/* <h3 className="mt-10">Comments</h3>
                    <hr className="mt-4" />

                    <div className="comment-container overflow-y-scroll">
                        <Comment />
                       
                    </div> */}
                    {/* <Picker /> */}
                    <CommentsContainer comments={comments} />
                </div>
                <div className="right-section w-2/6  bg-gray-300 p-5 text-sm">
                    <p className="text-gray-300 py-3">Project</p>
                    <p className="text-xs">
                        {project?.name} / {section?.name}{" "}
                    </p>
                    <hr className="border text-gray-50" />

                    <p className="text-gray-300 py-3">Due date</p>
                    <p className="text-xs">{dueDate}</p>
                    <hr className="border text-gray-50" />

                    <PriorityContainer
                        setShowPriorityModal={setShowPriorityModal}
                        priority={priority}
                    />

                    <LabelContainer
                        setShowLabelModal={setShowLabelModal}
                        labels={labels}
                        taskId={_id}
                    />
                    <p className="text-gray-300 py-3">Reminders</p>
                    <p className="text-gray-300 py-3">Location</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail
