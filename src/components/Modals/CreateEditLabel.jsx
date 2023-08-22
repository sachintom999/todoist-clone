import { useSelector } from "react-redux"
const CreateEditLabel = () => {
    const {
        createEditLabelModal: { data },
    } = useSelector(state => state.tasks)
    return (
        <div className="w-72 h-48 bg-red-200 p-5">
            <h2>{data?.title}</h2>

            <p>Label name</p>
            <input type="text" />

            <p>Label color</p>
            <select>
                <options></options>
            </select>
        </div>
    )
}

export default CreateEditLabel
