export const getPriorityColor = priority => {
    const priorityClass = {
        1: "red-700",
        2: "yellow-700",
        3: "blue-600",
        4: "white-400",
    }

    return priorityClass[priority]
}
