import { useDispatch } from "react-redux"
import { updateComment } from "../../redux/tasks"

const Reaction = ({ reaction, commentId }) => {
    const dispatch = useDispatch()
    return (
        <span
            className="flex justify-between border-2  border-blue-400 w-16 mx-4 my-2 px-3 rounded-3xl items-center cursor-pointer hover:bg-slate-400 transition delay-150 ease-in-out"
            onClick={() => {
                dispatch(
                    updateComment({
                        id: commentId,
                        reaction: {
                            emoji: reaction.emoji,
                            // userId: "64de23b915bec7b2f5d601b4",
                            userId: "64de23b915bec7b2f5d601b2",
                        },
                    })
                )
            }}
        >
            <span>{reaction.emoji}</span>
            <span className="text-xs text-blue-400">
                {reaction?.users?.length}
            </span>
        </span>
    )
}

export default Reaction
