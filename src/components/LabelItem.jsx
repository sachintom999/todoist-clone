import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import getIcon from "../utils/getIcons"

const LabelItem = ({ label }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="w-fill p-2 cursor-pointer">
            <div className="flex">
                <span className="text-xs">
                    {getIcon("tag", { fontSize: 10 })}
                    {label.name}
                </span>
            </div>
        </div>
    )
}

export default LabelItem
