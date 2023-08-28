import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllLabels } from "../redux/tasks"
import { useSelector } from "react-redux"
import LabelItem from "./LabelItem"
const Filters = () => {
    const dispatch = useDispatch()
    const { labels } = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(getAllLabels())
        console.log("labels", labels)
    }, [])

    return (
        <div className="w-screen h-screen">
            <h3 className="font-bold">Filters</h3>
            <h3 className="font-bold">Labels</h3>
            {labels.map(label => {
                return <LabelItem key={label._id} label={label} />
            })}
        </div>
    )
}

export default Filters
