import { BsEmojiSmile, BsFillMicFill } from "react-icons/bs"
import { ImAttachment } from "react-icons/im"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateTask } from "../redux/tasks"
const CommentForm = () => {
    const [showForm, setshowForm] = useState(false)
    const [newComment, setNewComment] = useState("")

    const dispatch = useDispatch()
    const {
        taskDetailModalContents: { _id },
    } = useSelector(state => state.tasks)

    return (
        <>
            {!showForm && (
                <div className="h-10  px-8 flex justify-between items-center my-10">
                    <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                        className="w-8 h-8 rounded-full"
                    />
                    <div
                        className="bg-transparent border-2 cursor-pointer hover:bg-gray-400 border-white flex justify-center items-center h-full w-11/12 rounded-full"
                        onClick={() => {
                            setshowForm(true)
                        }}
                    >
                        Comment
                    </div>
                </div>
            )}

            {showForm && (
                <form
                    className="h-44 border-2 border-white  w-full p-4 rounded-md flex-col justify-end"
                    onSubmit={e => {
                        e.preventDefault()
                        setshowForm(false)
                        dispatch(updateTask({ id: _id, comment: newComment }))
                    }}
                >
                    <input
                        type="text"
                        value={newComment}
                        onChange={e => {
                            setNewComment(e.target.value)
                        }}
                        className="outline-none border-none bg-transparent w-full"
                    />
                    <div className="flex justify-between items-center">
                        <span>
                            <ImAttachment
                                className="inline cursor-pointer"
                                fontSize={16}
                            />
                            <BsFillMicFill
                                className="inline cursor-pointer"
                                fontSize={16}
                            />
                            <BsEmojiSmile
                                className="inline cursor-pointer"
                                fontSize={16}
                            />
                        </span>

                        <button className="bg-red-300 text-white text-xs p-2 rounded-md">
                            COMMENT
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default CommentForm
