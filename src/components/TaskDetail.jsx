import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { AiOutlinePlus } from "react-icons/ai"
import { TbSection } from "react-icons/tb"
import ReactMarkdown from "react-markdown"

import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    closeTaskDetailForm,
    fetchTaskDetail,
    updateTask,
    updatetaskDetailModalState,
} from "../redux/tasks"
import PriorityModal from "./PriorityModal"
import Subtask from "./Subtask"

import getIcons from "../utils/getIcons"

import { getPriorityColor, replaceKeys1 } from "../config/helpers"
import AddForm from "./AddForm"
import CommentsContainer from "./CommentsContainer"
import LabelContainer from "./LabelContainer"
import LabelModal from "./LabelModal"
import ParentTask from "./ParentTask"
import PriorityContainer from "./PriorityContainer"
const TaskDetail = () => {
    const modalRef = useRef(null)
    // console.log("modalRef.current", modalRef.current)
    const [showCompleted, setShowCompleted] = useState(true)

    const dispatch = useDispatch()
    const { taskDetailModalContents, taskDetailModalState } = useSelector(
        state => state.tasks
    )

    // console.log("taskDetailModalContents", taskDetailModalContents)

    // console.log("taskDetailModalContents", taskDetailModalContents)

    const {
        title,
        _id,
        completed,
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

    console.log("nonCompletedSubtasks", nonCompletedSubtasks)

    const nonCompletedSubtasks1 = replaceKeys1(nonCompletedSubtasks)

    const [isComplete, setIsComplete] = useState(completed)

    const priorityClass = {
        1: "border-red-500",
        2: "border-yellow-700",
        3: "border-blue-600",
        4: "border-white-400",
    }

    const [showPriorityModal, setShowPriorityModal] = useState(false)
    const [showLabelModal, setShowLabelModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(title)
    const [updatedDesc, setUpdatedDesc] = useState(desc)
    const [nonCompletedSubtasksState, setNonCompletedSubtasksState] = useState(
        nonCompletedSubtasks1
    )

    const onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        const items1 = reorder(
            nonCompletedSubtasksState,
            result.source.index,
            result.destination.index
        )

        console.log("items1", items1)

        setNonCompletedSubtasksState(items1)
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const grid = 8

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        // padding: grid * 2,
        // margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    })

    const getListStyle = isDraggingOver => ({
        // background: isDraggingOver ? "lightblue" : "lightgrey",
        // padding: grid,
        // width: 250,
    })

    useEffect(() => {
        // dispatch(updatetaskDetailModalState({ labels }))

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
                    {getIcons("close", { className: "cursor-pointer" })}
                </span>
            </div>
            <div className="w-full flex h-full ">
                <div className="left-section w-4/6  bg-gray-200 p-5 overflow-y-auto ">
                    {parentTask && <ParentTask parentTask={parentTask} />}
                    <input
                        type="checkbox"
                        className={`w-4 h-4 rounded-full bg-transparent border-2  border-${getPriorityColor(
                            priority
                        )}   ${showForm ? "opacity-60" : ""} `}
                        onChange={e => {
                            console.log("e.target.value", e.target.checked)
                            setIsComplete(e.target.checked)

                            console.log("isComplete", isComplete)

                            dispatch(
                                updateTask({
                                    id: _id,
                                    completed: e.target.checked,
                                })
                            )
                        }}
                        disabled={showForm ? "disabled" : ""}
                        checked={isComplete}
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
                                <ReactMarkdown className="py-4 text-sm">
                                    {desc}
                                </ReactMarkdown>
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
                            <div className="w-full">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <>
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={getListStyle(
                                                        snapshot.isDraggingOver
                                                    )}
                                                >
                                                    {nonCompletedSubtasksState?.map(
                                                        (item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={
                                                                    item.id
                                                                }
                                                                index={index}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <div
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided
                                                                                .draggableProps
                                                                                .style
                                                                        )}
                                                                    >
                                                                        <Subtask
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            subtask={
                                                                                item
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                            </>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>

                            {/* {nonCompletedSubtasks?.map(subtask => {
                                return (
                                    <Subtask
                                        key={subtask._id}
                                        subtask={subtask}
                                    />
                                )
                            })} */}
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
