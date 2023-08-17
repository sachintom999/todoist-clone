import { AiOutlinePlus } from "react-icons/ai"
import { useSelector } from "react-redux"
import Label from "./Label"

const LabelContainer = ({ setShowLabelModal, taskId }) => {
    const {
        taskDetailModalState: { labels: labelsList },
    } = useSelector(state => state.tasks)

    return (
        <>
            <p
                className="text-gray-300 py-3 px-1 rounded-md flex justify-between cursor-pointer  hover:bg-slate-400"
                onClick={() => {
                    setShowLabelModal(true)
                }}
            >
                <span>Labels</span>
                <span>
                    <AiOutlinePlus className="inline mr-2 " />
                </span>
            </p>

            {labelsList?.map(label => {
                return (
                    <Label key={label._id} name={label.name} taskId={taskId} />
                )
            })}
        </>
    )
}

export default LabelContainer
