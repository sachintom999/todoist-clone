import { useDispatch } from "react-redux"
import { fetchTaskDetail } from "../redux/tasks"

const SubtasksModal = ({ subtasks }) => {
    const dispatch = useDispatch()
    return (
        <div
            className=" w-1/4  absolute top-20 bg-gray-500 
        left-60 border-2 border-white"
        >
            Subtask
            {subtasks?.map(subtask => {
                return (
                    <p
                        className={`text-xs p-3 hover:bg-slate-700 cursor-pointer ${
                            subtask?.completed ? "line-through" : ""
                        } `}
                        onClick={() => {
                            dispatch(fetchTaskDetail(subtask?._id))
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={subtask?.completed ? "checked" : ""}
                        />
                        {subtask?.title}
                    </p>
                )
            })}
        </div>
    )
}

export default SubtasksModal
