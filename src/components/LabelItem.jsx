import { useDispatch } from "react-redux"
import { updatecreateEditLabelModal } from "../redux/tasks"
import getIcon from "../utils/getIcons"

const LabelItem = ({ label }) => {
    const dispatch = useDispatch()

    return (
        <div
            className="w-fill p-2"
            onClick={() => {
                dispatch(
                    updatecreateEditLabelModal({
                        show: true,
                        data: {
                            title: "Edit Label",
                        },
                    })
                )
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
