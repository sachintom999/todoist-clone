import { useDispatch } from "react-redux"
import { updatecreateEditLabelModal } from "../redux/tasks"
import getIcon from "../utils/getIcons"
import { useNavigate } from "react-router-dom"

const LabelItem = ({ label }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div
            className="w-fill p-2 cursor-pointer"
            onClick={() => {
                navigate(`/label/${label._id}`)
            }}
        >
            <div className="flex">
                <span className="text-xs">
                    {getIcon("tag", { fontSize: 10 })}
                    {label.name}
                </span>
            </div>

            <div></div>
        </div>
    )
}

export default LabelItem
