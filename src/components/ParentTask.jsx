import { AiOutlineBranches } from "react-icons/ai"
import { MdKeyboardArrowRight } from "react-icons/md"
import { getPriorityColor } from "../config/helpers"
import SubtasksModal from "./SubtasksModal"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchTaskDetail } from "../redux/tasks"

const ParentTask = ({ parentTask }) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className=" border-2 border-white  h-8 flex  items-center ">
            {showModal && <SubtasksModal subtasks={parentTask?.subtasks} />}
            <div
                className="hover:bg-red-200 cursor-pointer"
                onClick={() => {
                    dispatch(fetchTaskDetail(parentTask?._id))
                }}
            >
                <input
                    type="checkbox"
                    name=""
                    id=""
                    className={`w-4 h-4 rounded-full bg-transparent border-2  border-${getPriorityColor(
                        parentTask?.priority
                    )}`}
                />
                <span>{parentTask?.title}</span>|
            </div>
            <div
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <AiOutlineBranches fontSize={16} className="inline" />
                {parentTask?.subtasks?.length}
                <MdKeyboardArrowRight fontSize={20} className="inline" />
            </div>
        </div>
    )
}

export default ParentTask
