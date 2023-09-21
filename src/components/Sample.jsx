import {
    addDays,
    addMonths,
    addWeeks,
    format,
    getWeek,
    isSameDay,
    lastDayOfWeek,
    startOfWeek,
    subMonths,
    subWeeks,
} from "date-fns"
import { useState } from "react"
import getIcon from "../utils/getIcons"

export default function Sample() {
    const [showDetails, setShowDetails] = useState(false)
    const [data, setData] = useState(null)

    const showDetailsHandle = dayStr => {
        setData(dayStr)
        setShowDetails(true)
    }

    return (
        <div className="w-screen">
            <Calendar showDetailsHandle={showDetailsHandle} />

            {/* {showDetails && <Details data={data} />} */}
        </div>
    )
}

const Calendar = ({ showDetailsHandle }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth))
    const [selectedDate, setSelectedDate] = useState(new Date())

    const changeMonthHandle = btnType => {
        if (btnType === "prev") {
            setCurrentMonth(subMonths(currentMonth, 1))
        }
        if (btnType === "next") {
            setCurrentMonth(addMonths(currentMonth, 1))
        }
    }

    const changeWeekHandle = btnType => {
        if (btnType === "prev") {
            setCurrentMonth(subWeeks(currentMonth, 1))
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)))
        }
        if (btnType === "next") {
            setCurrentMonth(addWeeks(currentMonth, 1))
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)))
        }
        if (btnType === "today") {
            setSelectedDate(new Date())
            setCurrentMonth(new Date())
            setCurrentWeek(getWeek(currentMonth))
            const dayStr = format(new Date(), "ccc dd MMM yy")
            onDateClickHandle(new Date(), dayStr)
        }
    }

    const onDateClickHandle = (day, dayStr) => {
        console.log("day:::", day)
        setSelectedDate(day)
        showDetailsHandle(dayStr)
    }

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy"

        return (
            <div className="flex justify-between items-center ">
                <span className="font-bold text-sm">
                    {format(currentMonth, dateFormat)}
                    {/* {getIcon("arrowDown")} */}
                </span>

                <div className="flex">
                    <div className="flex items-center rounded-md  border border-gray-400 mr-4">
                        <div
                            className=" px-1 cursor-pointer text-center border-r"
                            onClick={() => changeWeekHandle("prev")}
                        >
                            {getIcon("arrowLeft")}
                        </div>

                        <div onClick={() => changeWeekHandle("next")}>
                            <div className=" px-1 cursor-pointer text-center">
                                {getIcon("arrowRight")}
                            </div>
                        </div>
                    </div>

                    <div
                        className="border text-xs px-2 py-1 rounded-md cursor-pointer"
                        onClick={() => changeWeekHandle("today")}
                    >
                        Today
                    </div>
                </div>
            </div>
        )
    }
    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 })
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 })
        const dateFormat = "d"
        const rows = []
        let days = []
        let day = startDate
        let dayy
        let formattedDate = ""
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat)
                dayy = format
                const cloneDay = day
                days.push(
                    <div
                        className={`col cell ${
                            isSameDay(day, new Date())
                                ? "today"
                                : isSameDay(day, selectedDate)
                                ? "selected"
                                : ""
                        }`}
                        key={day}
                        onClick={() => {
                            const dayStr = format(cloneDay, "ccc dd MMM yy")
                            onDateClickHandle(cloneDay, dayStr)
                        }}
                    >
                        <div
                            className={` text-gray-600 px-6 flex flex-col justify-center items-center mt-2  w-full cursor-pointer  ${
                                isSameDay(day, selectedDate)
                                    ? "border-b border-red-500 "
                                    : ""
                            }  `}
                        >
                            <p className="text-xs text-gray-200">
                                {format(day, "EEE")}
                            </p>
                            <p className="text-xl">{formattedDate}</p>
                        </div>
                    </div>
                )
                day = addDays(day, 1)
            }

            rows.push(
                <div className="flex w-full justify-evenly" key={day}>
                    {days}
                </div>
            )
            days = []
        }
        return <div className="w-full">{rows}</div>
    }
    const renderFooter = () => {
        return (
            <div className="header row flex">
                <div className="col col-start">
                    <div
                        className=" p-2"
                        onClick={() => changeWeekHandle("prev")}
                    >
                        prev
                    </div>
                </div>
                <div>{currentWeek}</div>
                <div
                    className="col col-end"
                    onClick={() => changeWeekHandle("next")}
                >
                    <div className=" p-2">next </div>
                </div>
                <div
                    className="text-green-600"
                    onClick={() => changeWeekHandle("today")}
                >
                    Today
                </div>
            </div>
        )
    }
    return (
        <div className="">
            {renderHeader()}
            {/* {renderFooter()} */}

            {renderCells()}
        </div>
    )
}

const Details = props => {
    return <div className="text-red-700 bg-yellow-200">{props.data}</div>
}
