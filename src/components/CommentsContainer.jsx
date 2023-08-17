import Comment from "./Comment"
import CommentForm from "./CommentForm"
const CommentsContainer = ({ comments }) => {
    return (
        <>
            <h3 className="mt-10">Comments</h3>
            <hr className="mt-4" />

            <div className="comment-container overflow-y-scroll">
                {comments?.map(comment => {
                    return <Comment key={comment._id} comment={comment} />
                })}
            </div>

            <CommentForm />
        </>
    )
}

export default CommentsContainer
