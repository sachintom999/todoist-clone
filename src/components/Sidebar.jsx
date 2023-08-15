import { AiOutlinePlus } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"
import { BsCalendar3, BsInbox } from "react-icons/bs"
import { MdToday } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { sideBarOptions } from "../config/menu"
const Sidebar = () => {
    const getIcon = route => {
        switch (route) {
            case "/inbox":
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
            return `flex bg-gray-700 justify-start items-center text-gray-200  `
        } else {
            return `flex bg-transparent  justify-start items-center text-gray-200`
        }
    }

    return (
        <div className="w-3/6  bg-dark3 text-gray-100 h-screen px-3 py-5 ">
            {sideBarOptions.map(item => {
                // console.log("item", iten)
                return (
                    <NavLink
                        key={item.label}
                        to={item.route}
                        className={({ isActive }) => {
                            return activeClasses(isActive)
                        }}
                    >
                        {/* <BsInbox fontSize={20} className="text-blue-400" /> */}
                        {getIcon(item.route)}

                        <p className="text-sm ml-2">{item.label}</p>
                    </NavLink>
                )
            })}

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
