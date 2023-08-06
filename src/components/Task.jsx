const Task = () => {
    return (
        <div className="bg-dark1 p-3 m-1 cursor-pointer rounded-md border-solid border-slate-700 shadow-gray-700 shadow-sm border">
            <div className="flex">
                <input type="checkbox" name="" id="" />
                <span className="ml-3">title</span>
            </div>
            <div>
                <p>Desc....</p>
            </div>
            <div className=" text-sm flex justify-between">
                <span className="text-red-400">12 Jun 9:00</span>
                <span className="">Inbox</span>
            </div>
        </div>
    )
}

export default Task
