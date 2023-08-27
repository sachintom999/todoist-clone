import { useDispatch } from "react-redux"
import Task from "../components/Task"

import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getInboxTasks, getProjectTasks } from "../redux/tasks"
import TaskDetail from "./TaskDetail"

const grid = 8
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "slategray" : "transparent",
    padding: grid,
    width: 300,
})

const priorityClass = {
    1: "border-red-700",
    2: "border-yellow-700",
    3: "border-blue-600",
    4: "border-white-400",
}

// const priorityClassName = priorityClass[priority] || "white"

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgray" : "transparent",

    // styles we need to apply on draggables
    ...draggableStyle,
})

const Main = ({ title, taskList }) => {
    const sampleData = [
        {
            id: "list-1",
            items: [
                {
                    id: "item-0",
                    content: "item 0",
                },

                {
                    id: "item-1",
                    content: "item 1",
                },
                {
                    id: "item-2",
                    content: "item 2",
                },
            ],
        },
        {
            id: "list-2",
            items: [
                {
                    id: "item-10",
                    content: "item 10",
                },
                {
                    id: "item-11",
                    content: "item 11",
                },
            ],
        },
    ]
    const { projectId } = useParams()
    const dispatch = useDispatch()

    const { todaySections, taskDetailOpen, pageTasks } = useSelector(
        state => state.tasks
    )

    const [lists, setLists] = useState(pageTasks)
    const [showAddSectionForm, setShowAddSectionForm] = useState(null)

    useEffect(() => {
        // dispatch(getTodayTasks(taskList))

        console.log("🔴rendering...")

        if (projectId) {
            dispatch(getProjectTasks(projectId))

            setLists(pageTasks)
        } else {
            dispatch(getInboxTasks())
        }

        dispatch(getProjectTasks(projectId))
        setLists(pageTasks)
        console.log('lists', lists)



    }, [projectId])

    const onDragEnd = result => {
        const { source, destination } = result
        console.log({ source, destination })

        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const listToUpdate = lists.find(
                list => list.id.id === source.droppableId
            )

            const updatedItems = Array.from(listToUpdate.tasks)
            const [removed] = updatedItems.splice(source.index, 1)
            updatedItems.splice(destination.index, 0, removed)

            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id.id === source.droppableId
                        ? { ...list, tasks: updatedItems }
                        : list
                )
            })

            console.log("newList", lists)
        } else {
            const sourceListToUpdate = lists.find(list => {
                console.log(list.id.id, source.droppableId)
                return list.id.id === source.droppableId
            })
            const destinationListToUpdate = lists.find(
                list => list.id.id === destination.droppableId
            )

            const updatedSourceItems = Array.from(sourceListToUpdate.tasks)
            const updatedDestinationItems = Array.from(
                destinationListToUpdate.tasks
            )

            const [removed] = updatedSourceItems.splice(source.index, 1)
            updatedDestinationItems.splice(destination.index, 0, removed)

            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id.id === source.droppableId
                        ? { ...list, tasks: updatedSourceItems }
                        : list.id.id === destination.droppableId
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
                                key={section.id.id}
                                droppableId={section.id.id}
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
                                                {section.id.sectionName}
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
