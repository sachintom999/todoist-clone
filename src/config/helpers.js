import { getDay, isToday, isTomorrow, addDays } from "date-fns"
import { format } from "date-fns-tz"
import { enUS } from "date-fns/locale/index.js" // Replace 'enUS' with the desired locale for your app

export function formattedDate(
    date = "2023-09-10T00:00:00.001Z",
    userTimeZone = "Asia/Kolkata"
) {
    const currentDate = new Date()
    const dueDate = new Date(date)

    const timeFormat = dueDate.getMilliseconds() === 1 ? `` : `h:mm a`

    if (isToday(dueDate)) {
        return format(dueDate, `'Today' ${timeFormat}`, {
            locale: enUS, // Replace with the desired locale
            timeZone: userTimeZone,
        })
    } else if (isTomorrow(dueDate)) {
        return format(dueDate, `'Tomorrow' ${timeFormat}`, {
            locale: enUS, // Replace with the desired locale
            timeZone: userTimeZone,
        })
    } else {
        // Calculate the date 5 days from tomorrow
        const futureDate = addDays(currentDate, 2) // Tomorrow
        futureDate.setDate(futureDate.getDate() + 4) // 5 days from tomorrow

        if (dueDate >= currentDate && dueDate <= futureDate) {
            // Display the day of the week for dates within the next 5 days after tomorrow
            return format(dueDate, `EEEE ${timeFormat}`, {
                locale: enUS, // Replace with the desired locale
                timeZone: userTimeZone,
            })
        } else {
            // Handle dates outside the specified range
            return format(dueDate, `dd MMM ${timeFormat}`, {
                timeZone: userTimeZone,
            })
        }
    }
}

console.log(formattedDate("2023-09-04T00:00:00.001Z"))
console.log(formattedDate("2023-09-05T00:00:00.001Z"))
console.log(formattedDate("2023-09-06T00:00:00.001Z"))
console.log(formattedDate("2023-09-07T00:00:00.001Z"))
console.log(formattedDate("2023-09-08T00:00:00.001Z"))
console.log(formattedDate("2023-09-09T00:00:00.001Z"))
console.log(formattedDate("2023-09-10T00:00:00.001Z"))
console.log(formattedDate("2023-09-11T00:00:00.001Z"))
console.log(formattedDate("2023-09-12T00:00:00.001Z"))
console.log(formattedDate("2023-09-13T00:00:00.001Z"))

// Example usage:
// const dueDate = "2023-09-12T00:00:00.001Z"; // Replace with your actual due date
// const userTimeZone = 'Asia/Kolkata'; // Replace with the user's actual timezone

// const humanReadableDueDate = getHumanReadableDate(dueDate, userTimeZone);
// console.log(humanReadableDueDate);

export const getPriorityColor = priority => {
    const priorityClass = {
        1: "red-700",
        2: "yellow-700",
        3: "blue-600",
        4: "white-400",
    }

    return priorityClass[priority]
}

export const colorOptions = [
    { name: "Red", color: "red" },
    { name: "Blue", color: "blue" },
    { name: "Green", color: "green" },
]

export const replaceKeys = obj => {
    if (Array.isArray(obj)) {
        return obj.map(item => replaceKeys(item))
    } else if (obj !== null && typeof obj === "object") {
        const newObj = {}
        for (const key in obj) {
            const newKey =
                key === "_id" ? "id" : key === "sectionId" ? "id" : key
            newObj[newKey] = replaceKeys(obj[key])
        }
        return newObj
    } else {
        return obj
    }
}

export const replaceKeys1 = data => {
    if (typeof data === "object" && data !== null) {
        if (Array.isArray(data)) {
            return data.map(item => replaceKeys(item))
        } else {
            const newData = {}
            for (const key in data) {
                const newKey = key.replace("_id", "id")
                newData[newKey] = replaceKeys(data[key])
            }
            return newData
        }
    } else {
        return data
    }
}

export const grid = 8
export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "slategray" : "transparent",
    padding: grid,
    width: 300,
})
export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgray" : "transparent",

    // styles we need to apply on draggables
    ...draggableStyle,
})
