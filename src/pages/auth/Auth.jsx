import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"

const Auth = () => {
    console.log("in auth...")
    return (
        <>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default Auth
