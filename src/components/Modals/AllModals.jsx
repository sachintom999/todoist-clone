import { useSelector } from "react-redux"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import CornerModal from "./CornerModal"
import AddForm from "../AddForm"

const AllModals = () => {
    const { deleteConfirmationModal, cornerModal, addTaskModal } = useSelector(
        state => state.tasks
    )
    return (
        <div className="absolute">
            {deleteConfirmationModal.show && <DeleteConfirmationModal />}
            {cornerModal.show && <CornerModal />}
            {addTaskModal.show && <AddForm />}
        </div>
    )
}

export default AllModals
