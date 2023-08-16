import { BsFlagFill, BsCheck } from "react-icons/bs"
import { IoPricetag } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { updateTask } from "../redux/tasks"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const LabelModal = ({ priority, taskId, setShowPriorityModal }) => {
    const dispatch = useDispatch()
    const { labelOptions, taskDetailModalState } = useSelector(
        state => state.tasks
    )
    const { labels } = taskDetailModalState

    // const priorities = [
    //     { value: 1, text: "wip", color: "text-red-500" },
    //     { value: 2, text: "think", color: "text-yellow-700" },
    //     { value: 3, text: "read", color: "text-blue-600" },
    //     { value: 4, text: "Priority 4", color: "text-white-400" },
    // ]

    useEffect(() => {}, [priority])

    return (
        <div className="absolute top-80 left-3/4  bg-gray-800 flex flex-col items-center justify-center rounded-md cursor-pointer overflow-hidden px-2 py-2">
            {labelOptions.map(label => (
                <p
                    key={label}
                    className={`text-xs py-3 px-4 hover:bg-slate-400 cursor-pointer ${
                        priority === label ? "" : ""
                    }`}
                    onClick={() => {
                        setShowPriorityModal(false)
                        dispatch(updateTask({ id: taskId, priority: label }))
                    }}
                >
                    <IoPricetag
                        className={`text-gray-600 mr-2 inline`}
                        fontSize={16}
                    />
                    {label}
                    {/* {priority === label && (
                        <BsCheck className={`text-red-500 inline ml-4`} />
                    )} */}

                    <input
                        type="checkbox"
                        className="ml-3 bg-transparent checked:bg-gray-500 text-right"
                        // checked={true}
                    />
                </p>
            ))}
        </div>
    )
}

export default LabelModal
