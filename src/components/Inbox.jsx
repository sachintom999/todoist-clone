import React, { useState } from "react"

function App() {
    let words, currentTag
    const origOptions = ["wip", "read", "buy"]
    const [content, setContent] = useState("")
    const [showLabels, setShowLabels] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const [labelOptions, setlabelOptions] = useState(origOptions)

    words = content.split(" ")

    const handleContentChange = e => {
        setContent(e.target.value)

        const tagStartIndex = content.lastIndexOf("@")
        const enteredTag = content.substring(tagStartIndex + 1)
        console.log("enteredTag", enteredTag)

        if (e.nativeEvent.data === "@") {
            setShowLabels(true)
        }
        if (e.nativeEvent.data === " ") {
            setShowLabels(false)
            setlabelOptions(origOptions)
        }
    }

    return (
        <div className="m-10">
            <textarea
                className="bg-gray-300 w-96 outline-none  bg-transparent "
                value={content}
                onChange={handleContentChange}
                placeholder="here..."
            ></textarea>

            <p className="m-10">
                {words.map(w => {
                    if (
                        w.startsWith("@") ||
                        w.startsWith("#") ||
                        w.startsWith("/")
                    ) {
                        return <span className="bg-red-200">{`${w} `}</span>
                    } else {
                        return <span>{`${w} `}</span>
                    }
                })}
            </p>

            {showLabels && <LabelList labelOptions={labelOptions} />}
        </div>
    )
}

export default App

const LabelList = ({ labelOptions }) => {
    return (
        <div className="bg-blue-200 w-1/2 text-center">
            {labelOptions.map(label => {
                return <p className="p-2">{label}</p>
            })}
        </div>
    )
}
