import { useSelector } from "react-redux"
import { Sidebar, Topbar } from "./components"
import Home from "./pages/Home"

const App = () => {
    const { count } = useSelector(state => state.tasks)
    console.log("count", count)

    return (
        <div>
            <Topbar />

            <div className="flex">
                <Sidebar />
                <Home />
            </div>
        </div>
    )
}

export default App
