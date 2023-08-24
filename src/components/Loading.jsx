import { BarLoader } from "react-spinners"
const Loading = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-black">
            <BarLoader
                color={"#dc4d4a"}
                loading={true}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading
