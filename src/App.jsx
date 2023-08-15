import { useDispatch, useSelector } from "react-redux"
import { Sidebar, Topbar } from "./components"
import Home from "./pages/Home"
import { BrowserRouter as Router } from "react-router-dom"
import { fetchAllTasks } from "./redux/tasks"
import { useEffect } from "react"

const App = () => {
    const { tasks } = useSelector(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTasks())
    }, [])

    // const { tasks } = useSelector(state => state.tasks)

    return (
        <div>
            <Topbar />

            <div className="flex">
                <Router>
                    <Sidebar />
                    <Home />
                </Router>
            </div>
        </div>
    )
}

export default App
