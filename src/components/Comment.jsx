import Picker from "emoji-picker-react"
import { useState } from "react"
import { MdOutlineAddReaction } from "react-icons/md"
import { useDispatch } from "react-redux"
import { updateComment } from "../redux/tasks"
const Comment = ({ comment: { text, reactions, createdAt, user, _id } }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const dispatch = useDispatch()

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
                                onClick={() => {
                                    setShowEmojiPicker(true)
                                }}
                            />

                            {showEmojiPicker && (
                                <Picker
                                    // width={250}
                                    // height={250}
                                    onEmojiClick={(emojiData, event) => {
                                        // console.log(emojiData.emoji)
                                        setShowEmojiPicker(false)
                                        dispatch(
                                            updateComment({
                                                id: _id,
                                                reaction: {
                                                    emoji: emojiData.emoji,
                                                },
                                            })
                                        )
                                    }}
                                    className="absolute top-10 left-10"
                                />
                            )}
                        </span>
                    </p>
                    <p className="text-xs mt-4">{text}</p>
                </div>
            </div>

            <div className="flex flex-wrap">
                {reactions?.map(reaction => {
                    return (
                        <span className="flex justify-between border-2  border-blue-400 w-16 mx-4 my-2 px-3 rounded-3xl items-center cursor-pointer">
                            <span>{reaction.emoji}</span>
                            <span className="text-xs text-blue-400">
                                {reaction?.users?.length}
                            </span>
                        </span>
                    )
                })}
            </div>
        </>
    )
}

export default Comment
