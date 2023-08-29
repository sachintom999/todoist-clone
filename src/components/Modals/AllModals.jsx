import { useSelector } from "react-redux"
import AddForm from "../AddForm"
import AddProject from "./AddProject"
import CornerModal from "./CornerModal"
import CreateEditLabel from "./CreateEditLabel"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

const AllModals = () => {
    const {
        deleteConfirmationModal,
        cornerModal,
        addTaskModal,
        createEditLabelModal,
        addProjectModal,
    } = useSelector(state => state.tasks)
    return (
        <div className="absolute m-auto">
            {deleteConfirmationModal.show && <DeleteConfirmationModal />}
            {cornerModal.show && <CornerModal />}
            {addTaskModal.show && <AddForm />}
            {createEditLabelModal.show && <CreateEditLabel />}
            {addProjectModal.show && <AddProject />}
        </div>
    )
}

export default AllModals
