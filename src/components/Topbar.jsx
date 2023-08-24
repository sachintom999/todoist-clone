import { AiOutlineBell, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import { BiSolidUserCircle } from "react-icons/bi"
import { BsCheckCircle, BsQuestionCircle } from "react-icons/bs"
import { FaStar } from "react-icons/fa"

import { GoSearch } from "react-icons/go"
import { GrHomeRounded } from "react-icons/gr"
import { updateaddTaskModal } from "../redux/tasks"
import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
const Topbar = () => {
    const dispatch = useDispatch()

    const { appState } = useSelector(state => state.tasks)

    // console.log("appState", appState)

    return (
        <div className="w-full bg-gray-100 ` h-10 p-2 flex justify-between text-xs font-light ">
            <div className="flex justify-around">
                <AiOutlineMenu fontSize={20} />
                <GrHomeRounded fontSize={20} />
                <GoSearch fontSize={20} />

                <input placeholder="Search" />
            </div>

            {appState.online ? "Online" : "Offline"}

            <div className="flex justify-around">
                <button className="flex">
                    <FaStar className="text-yellow-500" fontSize={15} />
                    <span>Upgrade to Pro</span>
                </button>
                <AiOutlinePlus
                    fontSize={20}
                    onClick={() => {
                        dispatch(
                            updateaddTaskModal({
                                show: true,
                                // data: { title, _id },
                            })
                        )
                    }}
                />
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
