import { MdOutlineAddReaction } from "react-icons/md"
const Comment = ({ comment: { text, reactions, createdAt, user } }) => {
    return (
        <>
            <div className="flex p-3 ">
                <div className="img-container mr-4">
                    <img
                        src={user?.image}
                        // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <div className="others flex flex-col text-sm">
                    <p className="flex justify-between">
                        <span className="inline">
                            <span>
                                {user?.firstName} {user?.lastName}
                            </span>
                            <span className="text-xs ml-3 text-gray-400">
                                {createdAt}
                            </span>
                        </span>
                        <span className="inline">
                            <MdOutlineAddReaction
                                fontSize={20}
                                className="inline cursor-pointer"
                            />
                        </span>
                    </p>
                    <p className="text-xs mt-4">{text}</p>
                </div>
            </div>

            <div className="">
                {reactions?.map(reaction => {
                    return (
                        <>
                            <span>{reaction.emoji}</span>
                            <span>{reaction?.users?.length}</span>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Comment
