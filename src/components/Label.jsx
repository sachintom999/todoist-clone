import { AiOutlineClose, AiOutlineTag } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { updateTask, updatetaskDetailModalState } from "../redux/tasks"
const Label = ({ name, taskId }) => {
    const dispatch = useDispatch()

    const { taskDetailModalState } = useSelector(state => state.tasks)
    const { labels: labelsList } = taskDetailModalState

    return (
        <span className="bg-slate-400 px-2 py-1 rounded-md mr-2 text-xs cursor-pointer">
            {name}
            <span
                onClick={() => {
                    const newList = labelsList.filter(item => item !== name)
                    // console.log("newList", newList)
                    // setLabelsList(newList)
                    dispatch(updatetaskDetailModalState({ labels: newList }))
                    dispatch(updateTask({ id: taskId, labels: newList }))
                }}
            >
                <AiOutlineClose fontSize={10} className="inline" />
            </span>
        </span>
    )
}

export default Label
