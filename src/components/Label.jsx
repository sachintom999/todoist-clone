import { AiOutlineClose, AiOutlineTag } from "react-icons/ai"
const Label = ({ name }) => {
    return (
        <span className="bg-slate-400 px-2 py-1 rounded-md mr-2 text-xs cursor-pointer">
            {name} <AiOutlineClose fontSize={10} className="inline" />
        </span>
    )
}

export default Label
