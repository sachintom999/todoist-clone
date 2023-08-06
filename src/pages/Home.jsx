import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom"
import { Filters, Inbox, Main, Today, Upcoming } from "../components"

const Home = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/today" />} />
                    <Route path="/today" element={<Main title="Today" />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/filters" element={<Filters />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Home
