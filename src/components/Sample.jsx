// import "./styles.css";
import { useState } from "react"
// import Calendar from "./Calendar";
// import Details from "./Details"

export default function App() {
    const [showDetails, setShowDetails] = useState(false)
    const [data, setData] = useState(null)

    const showDetailsHandle = dayStr => {
        setData(dayStr)
        setShowDetails(true)
    }

    return (
        <div className="w-screen">
            {/* <h1>Week View Calendar with react</h1> */}
            {/* <br /> */}
            {/* <h2>Example</h2> */}
            <Calendar showDetailsHandle={showDetailsHandle} />
            {/* <br /> */}
            {showDetails && <Details data={data} />}
        </div>
    )
}

/**
 * Follow this tutorial https://medium.com/@moodydev/create-a-custom-calendar-in-react-3df1bfd0b728
 * and customised by TTNT
 * date-fns doc: https://date-fns.org/v2.21.1/docs
 */

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
        //console.log("current week", currentWeek);
        if (btnType === "prev") {
            //console.log(subWeeks(currentMonth, 1));
            setCurrentMonth(subWeeks(currentMonth, 1))
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)))
        }
        if (btnType === "next") {
            //console.log(addWeeks(currentMonth, 1));
            setCurrentMonth(addWeeks(currentMonth, 1))
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)))
        }
        if (btnType === "today") {
            //console.log(addWeeks(currentMonth, 1));
            setSelectedDate(new Date())
            setCurrentMonth(new Date())
            setCurrentWeek(getWeek(currentMonth))
        }
    }

    const onDateClickHandle = (day, dayStr) => {
        setSelectedDate(day)
        showDetailsHandle(dayStr)
    }

    const renderHeader = () => {
        const dateFormat = "MMM yyyy"
        // console.log("selected day", selectedDate);
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div> */}
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end">
                    {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
                </div>
            </div>
        )
    }
    const renderDays = () => {
        const dateFormat = "EEE"
        const days = []
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 })
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center bg-blue-200 p-2 border border-green-400" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            )
        }
        return <div className="flex bg-red-200">{days}</div>
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
                        <span className="number text-yellow-600 p-2">{formattedDate} {format(day,"EEE")} </span>
                        {/* <span className="bg">{formattedDate}</span> */}
                    </div>
                )
                day = addDays(day, 1)
            }

            rows.push(
                <div className="flex" key={day}>
                    {days}
                </div>
            )
            days = []
        }
        return <div className="body">{rows}</div>
    }
    const renderFooter = () => {
        return (
            <div className="header row flex">
                <div className="col col-start">
                    <div
                        className="bg-pink-100 p-2"
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
                    <div className="bg-pink-100 p-2">next </div>
                </div>
                <div className="text-green-600" onClick={() => changeWeekHandle("today")}  >Today</div>
            </div>
        )
    }
    return (
        <div className="calendar">
            {renderHeader()}
            {renderFooter()}
            {/* {renderDays()} */}
            {renderCells()}
        </div>
    )
}

/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */


const Details = (props) => {
  return <div>{props.data}</div>;
};


