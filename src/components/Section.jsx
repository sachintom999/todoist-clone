import AddTaskButton from "./AddTaskButton"
import AddTaskForm from "./AddTaskForm"
import Task from "./Task"

import { useState } from "react"
import { useSelector } from "react-redux"
const Section = ({ title, tasks }) => {
    const [formOpen, setFormOpen] = useState(false)

    const { addTaskFormOpen } = useSelector(state => state.tasks)

    return (
        <div className="bg-transparent p-5 m-3 text-gray-200 w-2/5 ">
            <h3 className="font-bold text-md mb-4">{title}</h3>
            {tasks.map(task => {
                return (
                    <Task
                        key={task._id}
                        // title={task.title}
                        // desc={task.desc}
                        // id={task._id}
                        task={task}
                    />
                )
            })}

            <AddTaskButton formOpen={formOpen} setFormOpen={setFormOpen} />
            <AddTaskForm formOpen={formOpen} setFormOpen={setFormOpen} />
        </div>
    )
}

export default Section
