import { useSelector } from "react-redux"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import CornerModal from "./CornerModal"
import AddForm from "../AddForm"
import CreateEditLabel from "./CreateEditLabel"

const AllModals = () => {
    const {
        deleteConfirmationModal,
        cornerModal,
        addTaskModal,
        createEditLabelModal,
    } = useSelector(state => state.tasks)
    return (
        <div className="absolute m-auto">
            {deleteConfirmationModal.show && <DeleteConfirmationModal />}
            {cornerModal.show && <CornerModal />}
            {addTaskModal.show && <AddForm />}
            {createEditLabelModal.show && <CreateEditLabel />}
        </div>
    )
}

export default AllModals
