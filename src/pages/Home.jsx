import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom"
import { Filters, Inbox, Sidebar, Today, Topbar, Upcoming } from "../components"

const Home = () => {
    return (
        <div>
            <Topbar />
            <Sidebar />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/today" />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/filters" element={<Filters />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Home
