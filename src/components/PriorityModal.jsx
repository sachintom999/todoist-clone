import { BsFlagFill, BsCheck } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { updateTask } from "../redux/tasks"
import { useEffect } from "react"

const PriorityModal = ({ priority, taskId, setShowPriorityModal }) => {
    const dispatch = useDispatch()

    const priorities = [
        { value: 1, text: "Priority 1", color: "text-red-500" },
        { value: 2, text: "Priority 2", color: "text-yellow-700" },
        { value: 3, text: "Priority 3", color: "text-blue-600" },
        { value: 4, text: "Priority 4", color: "text-white-400" },
    ]

    useEffect(() => {}, [priority])

    return (
        <div className="absolute top-64 left-3/4  bg-gray-800 flex flex-col items-center justify-center rounded-md cursor-pointer overflow-hidden p-0">
            {priorities.map(p => (
                <p
                    key={p.value}
                    className={`text-xs py-3 px-2 hover:bg-slate-400 ${
                        priority === p.value ? "bg-slate-400" : ""
                    }`}
                    onClick={() => {
                        setShowPriorityModal(false)
                        dispatch(updateTask({ id: taskId, priority: p.value }))
                    }}
                >
                    <BsFlagFill className={`${p.color} mr-3 inline`} />
                    {p.text}
                    {priority === p.value && (
                        <BsCheck className={`text-red-500 inline ml-4`} />
                    )}
                </p>
            ))}
        </div>
    )
}

export default PriorityModal
