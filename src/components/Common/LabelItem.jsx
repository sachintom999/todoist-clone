import { AiOutlineTag } from "react-icons/ai"
import LabelTasks from "../LabelTasks"

export default function LabelItem({ label }) {
    return (
        <p
            key={LabelTasks._id}
            className="group text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
        >
            <AiOutlineTag
                fontSize={12}
                className="text-gray-400 mr-3"
                style={{ color: label?.color }}
            />
            <span>{label.name}</span>
        </p>
    )
}
