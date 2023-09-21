import { IoMdPricetag } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import getIcon from "../../utils/getIcons"
const SidebarItem = ({ item, itemType }) => {
    const navigate = useNavigate()

    const getSymbol = () => {
        if (itemType === "project") {
            return (
                <span
                    className="block  rounded-full w-2 h-2 mr-3"
                    style={{ backgroundColor: item?.color }}
                ></span>
            )
        }
        return (
            <IoMdPricetag
                fontSize={18}
                className="text-gray-400 mr-2 rotate-270"
                style={{ color: item?.color }}
            />
        )
    }

    return (
        <p
            key={item._id}
            className="group text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
            onClick={() => {
                navigate(`/${itemType}/${item._id}`)
            }}
        >
            {getSymbol()}
            <span>{item.name}</span>
            {getIcon("heartOff", {
                fontSize: 10,
                className: "ml-auto invisible group-hover:visible",
                onClick: e => {
                    e.stopPropagation()
                    console.log("remove from favourites.. PENDING TO IMPLEMENT")
                },
            })}
        </p>
    )
}

export default SidebarItem
