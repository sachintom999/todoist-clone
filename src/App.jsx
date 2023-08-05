import { useSelector } from "react-redux"
import Home from "./pages/Home"

const App = () => {
    const { count } = useSelector(state => state.tasks)
    console.log("count", count)

    return (
        <div>
            <Home />
        </div>
    )
}

export default App
