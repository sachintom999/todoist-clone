import { AiOutlineBell, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import { BiSolidUserCircle } from "react-icons/bi"
import { BsCheckCircle, BsQuestionCircle } from "react-icons/bs"

import { GoSearch } from "react-icons/go"
import { GrHomeRounded } from "react-icons/gr"

const Topbar = () => {
    return (
        <div className="w-full bg-gray-100   h-10 p-2 flex justify-between text-xs font-light ">
            <div className="flex justify-around">
                <AiOutlineMenu fontSize={20} />
                <GrHomeRounded fontSize={20} />
                <GoSearch fontSize={20} />

                <input placeholder="Search" />
            </div>

            <div className="flex justify-around">
                <button>⭐️ Upgrade to Pro</button>
                <AiOutlinePlus fontSize={20} />
                <BsCheckCircle fontSize={20} />
                <span>8/5</span>
                <BsQuestionCircle fontSize={20} />
                <AiOutlineBell fontSize={20} />
                <BiSolidUserCircle fontSize={20} />
            </div>
        </div>
    )
}

export default Topbar
