import { AiOutlinePlus } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"
import { BsCalendar3, BsInbox } from "react-icons/bs"
import { MdToday } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { sideBarOptions } from "../config/menu"
import ProjectList from "./SideBar/ProjectList"
import FavouriteList from "./SideBar/FavouriteList"

import getIcons from '../utils/getIcons'
const Sidebar = () => {
    const getIcon = route => {
        switch (route) {
            case "/project/inbox":
                return <BsInbox fontSize={20} className="text-blue-400" />
            case "/today":
                return <MdToday fontSize={20} className="text-green-800" />
            case "/upcoming":
                return <BsCalendar3 fontSize={20} className="text-violet-600" />
            case "/filters-labels":
                return <BiCategory fontSize={20} className="text-yellow-600" />
        }
    }

    const activeClasses = isActive => {
        if (isActive) {
            return `flex bg-gray-700 justify-start items-center text-gray-200 p-2 rounded-md text-xs `
        } else {
            return `flex bg-transparent  justify-start items-center text-gray-200 p-2 rounded-md text-xs`
        }
    }

    return (
        <div className="w-[217px] flex-1  bg-dark3 text-gray-100  px-3 py-5  flex flex-col">
            {sideBarOptions.map(item => {
                return (
                    <NavLink
                        key={item.label}
                        to={item.route}
                        className={({ isActive }) => {
                            return activeClasses(isActive)
                        }}
                    >
                        {getIcon(item.route)}

                        <p className="text-xs ml-2">{item.label}</p>
                    </NavLink>
                )
            })}

            
            <FavouriteList />
            <ProjectList />

            <div className="mt-auto text-sm flex items-center mb-4">
                {getIcons('plus',{ className : "mr-2"})}Add workspace
            </div>

            


        </div>
    )
}

export default Sidebar
