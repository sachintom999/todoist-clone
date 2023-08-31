import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { Filters, Main,  } from "../components"

import Inbox from "../components/Inbox1"
import Upcoming2 from "../components/Upcoming3"
import LabelTasks from "../components/LabelTasks"
import AddProject from "../components/Modals/AddProject"

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
                <Route path="/project/inbox" element={<Main title="Inbox"   />} />
                <Route path="/project/:projectId" element={<Main title="PROJ-NAME"   />} />
                <Route path="/label/:labelId" element={ <LabelTasks/> } />
                <Route path="/upcoming" element={<Upcoming2 />} />
                <Route path="/filters-labels" element={<Filters />} />
            </Routes>
            {/* </Router> */}
        </div>
    )
}

export default Home
