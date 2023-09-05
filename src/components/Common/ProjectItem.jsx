export default function ProjectItem({ project }) {
    return (
        <p
            key={project._id}
            className="group text-xs flex items-center w-full justify-start  p-2 rounded-md cursor-pointer hover:bg-slate-700"
        >
            <span
                className="block  rounded-full w-2 h-2 mr-3"
                style={{ backgroundColor: project?.color }}
            ></span>
            <span>{project.name}</span>
        </p>
    )
}
