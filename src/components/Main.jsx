import { useDispatch } from "react-redux"
import Task from "../components/Task"

import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getInboxTasks, getProjectTasks } from "../redux/tasks"
import TaskDetail from "./TaskDetail"
import {
    replaceKeys1,
    grid,
    getListStyle,
    getItemStyle,
} from "../config/helpers"

const Main = ({ title, taskList }) => {
    const { projectId } = useParams()
    const dispatch = useDispatch()

    const { taskDetailOpen, pageTasks } = useSelector(state => state.tasks)

    const [lists, setLists] = useState([])
    const [showAddSectionForm, setShowAddSectionForm] = useState(null)

    useEffect(() => {
        if (projectId) {
            dispatch(getProjectTasks(projectId))
            console.log("51")
        } else {
            console.log("53")
            dispatch(getInboxTasks())
        }

        const sectionsData = pageTasks?.sections
        setLists(replaceKeys1(sectionsData))
        console.log("....", replaceKeys1(sectionsData))
    }, [projectId])

    const onDragEnd = result => {
        const { source, destination } = result
        console.log({ source, destination })

        if (!destination) {
            return
        }

        console.log("lists", lists)
        if (source.droppableId === destination.droppableId) {
            const listToUpdate = lists.find(
                list => list.id === source.droppableId
            )

            const updatedItems = Array.from(listToUpdate.tasks)
            const [removed] = updatedItems.splice(source.index, 1)
            updatedItems.splice(destination.index, 0, removed)

            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id === source.droppableId
                        ? { ...list, tasks: updatedItems }
                        : list
                )
            })

            console.log("newList", lists)
        } else {
            const sourceListToUpdate = lists.find(list => {
                console.log(list.id, source.droppableId)
                return list.id === source.droppableId
            })
            const destinationListToUpdate = lists.find(
                list => list.id === destination.droppableId
            )

            const updatedSourceItems = Array.from(sourceListToUpdate.tasks)
            const updatedDestinationItems = Array.from(
                destinationListToUpdate.tasks
            )

            const [removed] = updatedSourceItems.splice(source.index, 1)
            updatedDestinationItems.splice(destination.index, 0, removed)

            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id === source.droppableId
                        ? { ...list, tasks: updatedSourceItems }
                        : list.id === destination.droppableId
                        ? { ...list, tasks: updatedDestinationItems }
                        : list
                )
            })

            console.log("newList", lists)
        }
    }

    return (
        <div className="flex flex-col bg-blue-200 py-10 px-8 h-screen w-screen ">
            {/* <div className="px-5  flex justify-between  ">
                <h2 className="text-white font-bold">{title}</h2>
                <div className="text-white  flex cursor-pointer">
                    <GiSettingsKnobs className="rotate-90" fontSize={20} />
                    <span className="text-sm ml-2">View</span>
                </div>
            </div> */}

            <div className="flex">
                <DragDropContext onDragEnd={onDragEnd}>
                    {lists?.map((section, sectionIndex) => (
                        <>
                            <Droppable
                                key={section.id}
                                droppableId={section.id}
                            >
                                {(provided, snapshot) => {
                                    // console.log("lists", lists)
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}
                                        >
                                            <p className="text-center text-sm font-bold">
                                                {section.name}
                                            </p>
                                            {section?.tasks?.map(
                                                (task, index) => {
                                                    return (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={
                                                                task.id
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
                                                                    <Task
                                                                        key={
                                                                            task._id
                                                                        }
                                                                        task={
                                                                            task
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                }
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>

                            <VerticalBar
                                setShowAddSectionForm={setShowAddSectionForm}
                                sectionIndex={sectionIndex}
                            />

                            {showAddSectionForm == sectionIndex && (
                                <AddSectionForm
                                    setShowAddSectionForm={
                                        setShowAddSectionForm
                                    }
                                />
                            )}
                        </>
                    ))}
                </DragDropContext>

                {/* {pageTasks?.map(section => {
                    return (
                        <Section
                            key={section?._id?.sectionName}
                            title={section?._id?.sectionName}
                            tasks={section?.tasks}
                        />
                    )
                })} */}
            </div>
            {taskDetailOpen && <TaskDetail />}
        </div>
    )
}

export default Main

const VerticalBar = ({ setShowAddSectionForm, sectionIndex }) => {
    return (
        <div className="group">
            <div
                className=" bg-red-600  cursor-pointer  relative invisible group-hover:visible"
                onClick={() => {
                    setShowAddSectionForm(sectionIndex)
                }}
                style={{ width: "5px" }}
            >
                <p className="absolute top-1/2 -left-9 py-2 rounded-md text-xs w-20 text-center bg-black text-red-600  ">
                    Add section
                </p>
            </div>
        </div>
    )
}

const AddSectionForm = ({ setShowAddSectionForm }) => {
    return (
        <div className="w-64 p-2 text-xs ">
            <input
                type="text"
                name=""
                id=""
                className="w-full rounded-md text-xs"
                placeholder="Name this section"
            />
            <div className="mt-2 flex items-center">
                <button className="p-2 bg-red-800 text-white rounded-md hover:opacity-80 transition delay-75 font-bold">
                    Add section
                </button>
                <span
                    className="ml-4 hover:underline cursor-pointer"
                    onClick={() => {
                        setShowAddSectionForm(null)
                    }}
                >
                    Cancel
                </span>
            </div>
        </div>
    )
}
