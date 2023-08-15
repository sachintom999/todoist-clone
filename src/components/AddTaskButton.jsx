import { useState } from "react"
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, reset } from "../redux/tasks"
const AddTaskButton = ({ formOpen, setFormOpen }) => {
    const [isHovered, setIsHovered] = useState(false)

    const { noOfOpenForms } = useSelector(state => state.tasks)

    const dispatch = useDispatch()

    const plusIcon = () => {
        if (isHovered) {
            return <AiFillPlusCircle fontSize={20} className="text-red-400" />
        } else {
            return <AiOutlinePlus fontSize={20} className="text-red-400" />
        }
    }

    const textColor = () => {
        if (isHovered) {
            return `ml-4 text-red-400 `
        } else {
            return `ml-4 text-gray-400 `
        }
    }

    return (
        <div
            className="flex m-2 p-2 rounded-md cursor-pointer items-center"
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            onClick={() => {
                // dispatch(decrement())
                dispatch(increment())
                setFormOpen(true)

                setIsHovered(false)
            }}
        >
            {plusIcon(true)}

            <span className={textColor(true)}>Add task</span>
        </div>
    )
}

export default AddTaskButton
