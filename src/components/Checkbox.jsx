import { getPriorityColor } from "../config/helpers"

const Checkbox = () => {
    return (
        <>
            <input
                type="checkbox"
                className={`w-4 h-4 rounded-full bg-transparent border-2  border-${getPriorityColor(
                    priority
                )}   ${showForm ? "opacity-60" : ""} `}
                onChange={e => {
                    console.log("e.target.value", e.target.checked)
                    setIsComplete(e.target.checked)

                    console.log("isComplete", isComplete)

                    dispatch(
                        updateTask({
                            id: _id,
                            completed: e.target.checked,
                        })
                    )
                }}
                disabled={showForm ? "disabled" : ""}
                checked={isComplete}
            />
        </>
    )
}

export default Checkbox
