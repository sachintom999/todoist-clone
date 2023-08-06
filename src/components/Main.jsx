import { GiSettingsKnobs } from "react-icons/gi"
import Section from "./Section"

const Main = ({ title }) => {
    return (
        <div className="flex flex-col bg-dark2 py-10 px-8 h-screen w-screen ">
            <div className="px-5  flex justify-between  ">
                <h2 className="text-white font-bold">{title}</h2>
                <div className="text-white  flex cursor-pointer">
                    <GiSettingsKnobs className="rotate-90" fontSize={20} />
                    <span className="text-sm ml-2">View</span>
                </div>
            </div>
            <div className="flex p-5 w-full">
                <Section />
                <Section />
            </div>
        </div>
    )
}

export default Main
