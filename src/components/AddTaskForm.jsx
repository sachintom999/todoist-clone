import { AiOutlineClose, AiOutlineTag } from "react-icons/ai"
import { BsCalendar3, BsFlag } from "react-icons/bs"
import { IoMdSend } from "react-icons/io"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { useDispatch } from "react-redux"
import { closeAddTaskForm } from "../redux/tasks"

const AddTaskForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        console.log("11")
    }

    return (
        <form
            className="flex flex-col bg-dark1  border rounded-md border-gray-600 mt-4"
            onSubmit={handleSubmit}
        >
            <div className=" p-5 flex flex-col">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Task name"
                    className="bg-transparent outline-none border-none text-sm"
                />
                <textarea
                    placeholder="Description"
                    className="bg-transparent outline-none border-none text-xs mt-3"
                ></textarea>

                <div className="flex gap-2 mt-3">
                    <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                        <BsCalendar3 fontSize={15} className="text-white" />
                    </div>
                    <div className="p-2 bg-transparent border-2 bor border-gray-600 rounded-md cursor-pointer">
                        <BsFlag fontSize={15} className="text-white" />
                    </div>
                    <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                        <AiOutlineTag fontSize={15} className="text-white" />
                    </div>
                    <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                        <MdOutlineMoreHoriz
                            fontSize={15}
                            className="text-white"
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className="flex px-5 py-2 justify-between items-center">
                <div className="text-sm">Inbox</div>
                <div className="flex gap-2">
                    <div
                        className="p-2 bg-gray-500 opacity-30 rounded-sm cursor-pointer"
                        onClick={() => {
                            dispatch(closeAddTaskForm())
                        }}
                    >
                        <AiOutlineClose fontSize={18} />
                    </div>
                    <button className="p-2 bg-red-500 opacity-30 rounded-sm cursor-pointer">
                        <IoMdSend className="text-slate-50" fontSize={18} />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddTaskForm
