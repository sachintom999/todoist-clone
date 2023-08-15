import { BiCategory } from "react-icons/bi"
const sideBarOptions = [
    {
        route: "/inbox",
        label: "Inbox",
    },
    {
        route: "/today",
        label: "Today",
    },
    {
        route: "/upcoming",
        label: "Upcoming",
    },
    {
        route: "/filters-labels",
        label: "Filters & Labels",
        // component: <BiCategory fontSize={20} className="text-yellow-600" />,
    },
]

export { sideBarOptions }

/*

<MdToday fontSize={20} className="text-green-800" />
<BsCalendar3 fontSize={20} className="text-violet-600" />
<BiCategory fontSize={20} className="text-yellow-600" />

*/
