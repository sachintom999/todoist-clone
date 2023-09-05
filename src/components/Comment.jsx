import Picker from "emoji-picker-react"
import { useState } from "react"
import { MdOutlineAddReaction } from "react-icons/md"
import { useDispatch } from "react-redux"
import { updateComment } from "../redux/tasks"
import Reaction from "./Comment/Reaction"
import { formattedDate } from "../config/helpers"
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
                                {formattedDate(createdAt)}
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
                                                    // userId: "64de23b915bec7b2f5d601b4",
                                                    userId: "64de23b915bec7b2f5d601b2",
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
                        <Reaction
                            key={reaction._id}
                            reaction={reaction}
                            commentId={_id}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Comment
