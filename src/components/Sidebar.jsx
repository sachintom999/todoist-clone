import { BiCategory } from "react-icons/bi"
import { BsCalendar3, BsInbox, BsFlag } from "react-icons/bs"
import { MdToday } from "react-icons/md"

import { AiOutlinePlus } from "react-icons/ai"
const Sidebar = () => {
    return (
        <div className="w-2/6  bg-dark3 text-gray-100 h-screen px-3 py-5 ">
            <div className="flex justify-start items-center">
                <BsInbox fontSize={20} className="text-blue-400" />
                <p className="text-sm ml-2">Inbox</p>
            </div>
            <div className="flex justify-start items-center">
                <MdToday fontSize={20} className="text-green-800" />
                <p className="text-sm ml-2">Today</p>
            </div>
            <div className="flex justify-start items-center">
                <BsCalendar3 fontSize={20} className="text-violet-600" />
                <p className="text-sm ml-2">Upcoming</p>
            </div>
            <div className="flex justify-start items-center">
                <BiCategory fontSize={20} className="text-yellow-600" />
                <p className="text-sm ml-2">Filters & Labels</p>
            </div>

            <p>Favourites</p>

            <p>Projects</p>

            <div className="flex">
                <AiOutlinePlus fontSize={20} />
                Add workspace BETA
            </div>
        </div>
    )
}

export default Sidebar
