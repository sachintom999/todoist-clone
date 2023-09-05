import { TbSection } from "react-icons/tb"

export default function TaskItem({ task }) {
    return (
        <p
            key={task._id}
            className="group text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
        >
            <input
                type="checkbox"
                className={`w-4 h-4 rounded-full bg-transparent border-2 `}
            />

            <span className="ml-2">{task.title}</span>
            <span className="ml-5 text-xs text-gray-700">
                / {task.project.name}
            </span>
        </p>
    )
}
