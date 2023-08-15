import { MdOutlineAddReaction } from "react-icons/md"
const Comment = () => {
    return (
        <div className="flex p-3 ">
            <div className="img-container mr-4">
                <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                    className="w-8 h-8 rounded-full"
                />
            </div>
            <div className="others flex flex-col text-sm">
                <p className="flex justify-between">
                    <span className="inline">
                        <span>Sachin</span>
                        <span className="text-xs ml-3 text-gray-400">
                            Today 10:22
                        </span>
                    </span>
                    <span className="inline">
                        <MdOutlineAddReaction
                            fontSize={20}
                            className="inline cursor-pointer"
                        />
                    </span>
                </p>
                <p className="text-xs mt-4">this is awesome..</p>
            </div>
            <div></div>
        </div>
    )
}

export default Comment
