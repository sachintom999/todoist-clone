import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Sidebar, Topbar } from "./components"
import GlobalKeyboardShortcuts from "./components/GlobalKeyboardShortcuts"
import AllModals from "./components/Modals/AllModals"
import Home from "./pages/Home"
import { fetchAllTasks } from "./redux/tasks"
import Loading from "./components/Loading"
const App = () => {
    const { tasks, appState } = useSelector(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTasks())
    }, [])

    // const { tasks } = useSelector(state => state.tasks)

    return (
        <>
            {appState.loading ? (
                <Loading />
            ) : (
                <div>
                    <AllModals />
                    <Topbar />

                    <div className="flex">
                        <Router>
                            {/* <GlobalKeyboardShortcuts /> */}
                            {/* <Sidebar /> */}
                            <Home />
                        </Router>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
