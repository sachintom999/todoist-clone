import { useState } from "react"
import { useDispatch } from "react-redux"
import { colorOptions } from "../../config/helpers"
import { createProject, updateaddProjectModal } from "../../redux/tasks"
import getIcon from "../../utils/getIcons"
import CustomButton from "../Common/CustomButton"
import ToggleCheck from "../Common/ToggleCheck"

export default function AddProject() {
    const [name, setName] = useState("")
    const [color, setColor] = useState(colorOptions[0])
    const [showColorSelect, setShowColorSelect] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const dispatch = useDispatch()

    return (
        <form
            className="mmodal border-4 w-96 border-gray-400 relative bg-gray-800 text-white"
            onSubmit={e => {
                e.preventDefault()
                console.log({ name, color, favourite })

                const project = { name, color: color.color, favourite }
                dispatch(updateaddProjectModal({ show: false }))
                dispatch(createProject(project))
            }}
        >
            <div className="top-section">
                <h3 className="text-lg font-bold p-1">Add Project</h3>
            </div>
            <hr />
            <div className="mid-section p-2">
                <div className="my-4">
                    <p className="text-sm font-bold mb-1">Name</p>
                    <input
                        type="text"
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                        }}
                        className="h-7 rounded-md w-full text-xs p-2 text-black"
                    />
                </div>
                <div className="my-4">
                    <p className="text-sm font-bold mb-1">Color</p>
                    <div
                        onClick={() => {
                            setShowColorSelect(!showColorSelect)
                        }}
                    >
                        <ColorOption option={color} />
                    </div>
                    {showColorSelect && (
                        <div className="cursor-pointer rounded-md absolute z-10 bg-slate-500 w-full">
                            {colorOptions.map(option => (
                                <div
                                    className="flex items-center p-1 hover:bg-slate-700 rounded-md"
                                    onClick={() => {
                                        setShowColorSelect(false)
                                        setColor(option)
                                    }}
                                >
                                    <span
                                        className="rounded-full bg-red-300 w-3 h-3"
                                        style={{
                                            backgroundColor: option?.color,
                                        }}
                                    ></span>
                                    <span className="text-sm ml-2">
                                        {option?.name}
                                    </span>
                                    {color.name === option.name &&
                                        getIcon("check", {
                                            className: "ml-auto",
                                        })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <ToggleCheck
                    text="Add to favourites"
                    checkedVal={favourite}
                    onChange={() => {
                        setFavourite(!favourite)
                    }}
                />
            </div>

            <hr />

            <div className="botttom-section flex justify-end p-2">
                <CustomButton text="Add" additionalClass={"bg-red-600 mr-4"} />
                <CustomButton
                    text="Cancel"
                    additionalClass={"bg-gray-600"}
                    onClick={e => {
                        e.preventDefault()
                        console.log("first")
                        dispatch(updateaddProjectModal({ show: false }))
                    }}
                />
            </div>
        </form>
    )
}

function ColorOption({ option }) {
    return (
        <div className="flex items-center p-1 hover:bg-slate-700 rounded-md">
            <span
                className="rounded-full bg-red-300 w-3 h-3"
                style={{ backgroundColor: option?.color }}
            ></span>
            <span className="text-sm ml-2">{option?.name}</span>
        </div>
    )
}

// function ColorSelect(props) {
//     const [selectedColor, setSelectedColor] = useState()
//     const [show, setShow] = useState(props.showColorSelect)

//     return (
//         <div className="cursor-pointer rounded-md absolute z-10 bg-slate-500 w-full">
//             {colorOptions.map(option => (
//                 <ColorOption key={option.name} option={option} onClick={()=>{ props.setColor(option) }} />
//             ))}
//         </div>
//     )
// }
