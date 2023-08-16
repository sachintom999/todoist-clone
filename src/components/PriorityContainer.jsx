import { getPriorityColor } from "../config/helpers"
import { BsFlagFill } from "react-icons/bs"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
const PriorityContainer = ({ setShowPriorityModal, priority }) => {
    return (
        <>
            <p className="text-gray-300 py-3">Priority</p>
            <p
                className="text-xs flex justify-between hover:bg-slate-400 p-2 rounded-md cursor-pointer"
                onClick={() => {
                    setShowPriorityModal(true)
                }}
            >
                <span>
                    <BsFlagFill
                        className={`text-${getPriorityColor(priority)} inline`}
                    />
                    <span className="ml-2">P{priority}</span>
                </span>
                <span>
                    <MdOutlineKeyboardArrowDown
                        className="inline "
                        fontSize={15}
                    />
                </span>
            </p>
            <hr className="border text-gray-50 mt-3" />
        </>
    )
}

export default PriorityContainer
