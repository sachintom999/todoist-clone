import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { Filters, Main, Upcoming } from "../components"
import Inbox from "../components/Inbox1"

const Home = () => {
    const { taskList } = useSelector(state => state.tasks)

    // useEffect(() => {}, [])

    return (
        <div>
            {/* <Router> */}
            <Routes>
                <Route path="/" element={<Navigate to="/today" />} />
                <Route
                    path="/today"
                    element={<Main title="Today" taskList={taskList} />}
                />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/filters-labels" element={<Filters />} />
            </Routes>
            {/* </Router> */}
        </div>
    )
}

export default Home
