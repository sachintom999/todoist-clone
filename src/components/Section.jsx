import Task from "./Task"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState } from "react"
import { useSelector } from "react-redux"
const Section = ({ title, tasks }) => {
    // console.log('tasks', tasks)
    const [formOpen, setFormOpen] = useState(false)
    5
    const { addTaskFormOpen } = useSelector(state => state.tasks)

    return (
        <div className="flex flex-col items-center mt-6">
            <h3 className="font-bold text-md ">{title}</h3>
            <div className=" p-5 m-3 text-gray-200 w-56 bg-red-200  overflow-y-auto">
                {tasks?.map((task, index) => {
                    return (
                        <Task
                            key={task._id}
                            task={task}
                        />
                    )
                })}

                {/* <AddTaskButton formOpen={formOpen} setFormOpen={setFormOpen} /> */}
                {/* <AddTaskForm formOpen={formOpen} setFormOpen={setFormOpen} /> */}
            </div>
        </div>
    )
}

export default Section
