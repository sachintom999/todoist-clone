import { ImAttachment } from "react-icons/im"
import { BsFillMicFill, BsEmojiSmile } from "react-icons/bs"

import { useState } from "react"
const CommentForm = () => {
    const [showForm, setshowForm] = useState(false)

    return (
        <>
            {!showForm && (
                <div className="h-10  px-8 flex justify-between items-center mb-10">
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
                    }}
                >
                    <input
                        type="text"
                        name=""
                        id=""
                        className="outline-none border-none bg-transparent w-full "
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
