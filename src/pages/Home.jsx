import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { Filters, Main } from "../components"

import Inbox from "../components/Inbox2"
import Upcoming from "../components/Upcoming"
import LabelTasks from "../components/LabelTasks"
import AddProject from "../components/Modals/AddProject"
import UpcomingNew from "./UpcomingNew"
import { ToastContainer } from "react-toastify"

const Home = () => {
    const { taskList } = useSelector(state => state.tasks)

    // useEffect(() => {}, [])

    return (
        <div>
            {/* <Router> */}
            <Routes>
                {/* <Route path="/" element={<Navigate to="/today" />} /> */}
                {/* <Route path="/" element={<AddProject  />} /> */}
                <Route
                    path="/today"
                    element={<Main title="Today" taskList={taskList} />}
                />
                {/* <Route path="/project/inbox" element={<Main title="Inbox" />} /> */}
                <Route path="/project/inbox" element={<Inbox />} />
                <Route
                    path="/project/:projectId"
                    element={<Main title="PROJ-NAME" />}
                />
                <Route path="/label/:labelId" element={<LabelTasks />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/filters-labels" element={<Filters />} />
            </Routes>

        </div>
    )
}

export default Home
