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



export const  replaceKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => replaceKeys(item));
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            const newKey = key === '_id' ? 'id' : key === 'sectionId' ? 'id' : key;
            newObj[newKey] = replaceKeys(obj[key]);
        }
        return newObj;
    } else {
        return obj;
    }
}
