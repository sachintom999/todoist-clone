import { useNavigate } from "react-router-dom"
import { AiOutlineTag } from "react-icons/ai"
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
        return <AiOutlineTag fontSize={12} className="text-gray-400 mr-2" style={{ color: item?.color }}  />
    }

    return (
        <p
            key={item._id}
            className="text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
            onClick={() => {
                navigate(`/${itemType}/${item._id}`)
            }}
        >
            {getSymbol()}
            <span>{item.name}</span>
        </p>
    )
}

export default SidebarItem
