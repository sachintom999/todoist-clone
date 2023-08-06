import AddTaskButton from "./AddTaskButton"
import AddTaskForm from "./AddTaskForm"
import Task from "./Task"

import { useSelector } from "react-redux"
const Section = () => {
    const { addTaskFormOpen } = useSelector(state => state.tasks)
    console.log("addTaskFormOpen", addTaskFormOpen)

    return (
        <div className="bg-transparent p-5 m-3 text-gray-200 w-2/5 ">
            <h3 className="font-bold text-md">Section</h3>
            <Task />
            {!addTaskFormOpen && <AddTaskButton />}
            {addTaskFormOpen && <AddTaskForm />}

            {/* <Task /> */}
            {/* <Task /> */}
        </div>
    )
}

export default Section
