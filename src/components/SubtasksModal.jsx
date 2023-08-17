const SubtasksModal = ({ subtasks }) => {
    return (
        <div className=" w-1/4  absolute left-52 border-2 border-white">
            Subtasks
            {subtasks?.map(subtask => {
                return (
                    <p
                        className={`text-xs  ${
                            subtask?.completed ? "line-through" : ""
                        } `}
                    >
                        <input
                            type="checkbox"
                            checked={subtask?.completed ? "checked" : ""}
                        />{" "}
                        {subtask?.title}
                    </p>
                )
            })}
        </div>
    )
}

export default SubtasksModal
