import { TbSection } from "react-icons/tb"

export default function SectionItem({ section }) {
    return (
        <p
            key={section._id}
            className="group text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
        >
            <TbSection className="inline text-gray-800 mr-1" fontSize={20} />
            <span>{section.name}</span>
            <span className="ml-5 text-xs text-gray-700">/{section.project.name}</span>
        </p>
    )
}
