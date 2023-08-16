const Subtask = ({ subtask: { title, desc }, completed }) => {
    return (
        <div className="py-3 border-b px-2 ">
            <input
                type="checkbox"
                name="asdsa"
                id="asdas"
                className="w-4 h-4 rounded-full bg-transparent border-gray-600 outline-none focus:ring-0"
                // onChange={markComplete}
                checked={completed}
                onChange={() => {}}
            />
            <span className={`text-xs ml-3 ${completed ? "line-through" : ""}`}>
                {title}
            </span>
        </div>
    )
}

export default Subtask
