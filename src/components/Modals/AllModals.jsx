import { useSelector } from "react-redux"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import CornerModal from "./CornerModal"

const AllModals = () => {
    const { deleteConfirmationModal, cornerModal } = useSelector(
        state => state.tasks
    )
    return (
        <div className="absolute">
            {deleteConfirmationModal.show && <DeleteConfirmationModal />}
            {cornerModal.show && <CornerModal />}
        </div>
    )
}

export default AllModals
