import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Sidebar, Topbar } from "./components"
import GlobalKeyboardShortcuts from "./components/GlobalKeyboardShortcuts"
import { ToastContainer, toast } from "react-toastify"

import AllModals from "./components/Modals/AllModals"
import Home from "./pages/Home"
import { fetchAllTasks } from "./redux/tasks"
import Loading from "./components/Loading"
import { formattedDate } from "./config/helpers"
const App = () => {
    const { tasks, appState } = useSelector(state => state.tasks)

    // formattedDate()

    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch(fetchAllTasks())
    }, [])

    // const notify = () => toast("Wow so easy !");

    // const { tasks } = useSelector(state => state.tasks)

    return (
        <>
            {appState.loading ? (
                <Loading />
            ) : (
                <div className="w-screen h-screen">
                    <AllModals />

                    <div className="flex flex-col relative">
                        <Topbar />

                        <div className="flex flex-1">
                            <Router>
                                {/* <GlobalKeyboardShortcuts /> */}
                                <Sidebar />

                                <Home />
                            </Router>
                        </div>

                        <div className="absolute  bg-red-200 bottom-16 left-10 text-xs w-64 px-2 py-1 flex justify-center items-center rounded-md">
                            <ToastContainer
                            autoClose={2000}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
