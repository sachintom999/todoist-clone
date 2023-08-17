import { useState } from "react"
import AddForm from "./AddForm"
import AddTaskForm from "./AddTaskForm"
const Subtask = ({ subtask: { title, desc }, completed }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [showForm, setShowForm] = useState(false)

    // console.log({ title, desc })

    return (
        <div
            className="py-3 border-b px-2 "
            onMouseEnter={() => {
                setShowOptions(true)
            }}
            onMouseLeave={() => {
                setShowOptions(false)
            }}
        >
            {!showForm && (
                <>
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
                            className="relative text-gray-500 left-56 top-2 cursor-pointer"
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
