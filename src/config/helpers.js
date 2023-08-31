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