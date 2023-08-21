import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
import getIcon from "../../utils/getIcons"
import { deleteTask, updatedeleteConfirmationModal } from "../../redux/tasks"

const DeleteConfirmationModal = () => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(
            updatedeleteConfirmationModal({
                show: false,
                data: {},
            })
        )
    }

    const {
        deleteConfirmationModal: { data },
    } = useSelector(state => state.tasks)
    return (
        <div className="w-1/3 h-2/6  top-96 left-96 bg-slate-200 flex flex-col p-5 justify-evenly border">
            <div className="flex justify-between items-center">
                <span>{getIcon("info")}</span>
                <span onClick={closeModal}>{getIcon("close")}</span>
            </div>

            <p>Are you sure you want to delete {data.title} ?</p>

            <div className="flex justify-end">
                <button
                    className="text-sm py-2 px-3 rounded-md border mr-3"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="text-sm py-2 px-3 rounded-md border"
                    onClick={() => {
                        closeModal()
                        dispatch(deleteTask({ taskId: data._id }))
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
