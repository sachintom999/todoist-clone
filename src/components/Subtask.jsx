import { useState } from "react"
import AddForm from "./AddForm"
import AddTaskForm from "./AddTaskForm"
import { fetchTaskDetail } from "../redux/tasks"
import { useDispatch } from "react-redux"
const Subtask = ({ subtask: { title, desc, _id }, completed }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch()

    // console.log({ title, desc })

    return (
        <div
            className="py-3 border-b px-2  cursor-pointer"
            onMouseEnter={() => {
                setShowOptions(true)
            }}
            onMouseLeave={() => {
                setShowOptions(false)
            }}
            onClick={() => {
                dispatch(fetchTaskDetail(_id))
            }}
        >
            {!showForm && (
                <>
                    {
                        <span
                            className="relative text-gray-500 left-0 top-0 cursor-pointer text-xs mr-2"
                            onClick={() => {
                                setShowForm(true)
                            }}
                        >
                            ::
                        </span>
                    }
                    <input
                        type="checkbox"
                        name="asdsa"
                        id="asdas"
                        className="w-4 h-4 rounded-full bg-transparent border-gray-600 outline-none focus:ring-0"
                        // onChange={markComplete}
                        checked={completed}
                        onChange={() => {}}
                    />
                    <span
                        className={`text-xs ml-3 ${
                            completed ? "line-through" : ""
                        }`}
                    >
                        {title}
                    </span>

                    {showOptions && (
                        <span
                            className="relative text-gray-500 left-56 top-2 cursor-pointer text-xs"
                            onClick={() => {
                                setShowForm(true)
                            }}
                        >
                            edit
                        </span>
                    )}
                </>
            )}

            {showForm && <AddTaskForm titleProp={title} descProp={desc} />}
        </div>
    )
}

export default Subtask
