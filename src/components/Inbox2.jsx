import { useEffect } from "react"
import React, { useState } from "react"
import { BsCalendar3, BsFlag } from "react-icons/bs"
import { AiOutlineTag, AiFillTag, AiOutlineClose } from "react-icons/ai"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { IoMdSend } from "react-icons/io"

let tagsProp = []
let priority = null

function App() {
    const origLabelOptions = ["wip", "sip", "buy"]
    const priorityOptions = ["p1", "p2", "p3", "p4"];
    const [content, setContent] = useState("")
    const [showLabels, setShowLabels] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [labelOptions, setLabelOptions] = useState(origLabelOptions)
    const title = "",
        description = ""

    // let tags = ["tag-1","tag-2"]

    const handleContentChange = e => {
        // console.log(e.nativeEvent.data, "----", e.target.value)

        let words = e.target.value.split(" ")
        // console.log('words', words)

        let lastWord = words[words.length - 2]
        // console.log(`lastWord:: ..${lastWord}..` )

        setContent(e.target.value)
        // console.log("14 content", content)

        if (e.nativeEvent.data === "@") {
            setLabelOptions(origLabelOptions)
            setShowLabels(true)
            // setSearchTerm("")
        } else if (e.nativeEvent.inputType === "deleteContentBackward") {
            const tagStartIndex = e.target.value.lastIndexOf("@")
            const enteredTag = e.target.value.substring(
                tagStartIndex + 1,
                // e.target.value.length - 1
                e.target.value.length
            )

            // console.log(" DELETE enteredTag", enteredTag)

            // setSearchTerm(enteredTag)

            // const origLabelOptions = origLabelOptions.filter(option =>
            //     option.startsWith(enteredTag)
            // )
            // setLabelOptions(filteredOptions)
            // setShowLabels(true)

            if (enteredTag.length === 0) {
                setLabelOptions(origLabelOptions)
                setShowLabels(false)
            } else {
                // const filteredOptions = origLabelOptions.filter(option =>
                //     option.includes(enteredTag)
                // )
                // setLabelOptions(filteredOptions)
                // setShowLabels(true)
                filtering(enteredTag)
            }
        } else if (e.nativeEvent.data === " ") {
            // console.log('64' , lastWord)
            setShowLabels(false)
            setLabelOptions(origLabelOptions)
            lastWord.startsWith("@") && tagsProp.push(lastWord.slice(1))
           
        } else if (showLabels && e.nativeEvent.data !== "@") {
            const tagStartIndex = e.target.value.lastIndexOf("@")
            const enteredTag = e.target.value.substring(tagStartIndex + 1)

            // const filteredOptions = origLabelOptions.filter(option =>
            //     option.includes(enteredTag)
            // )
            // setLabelOptions(filteredOptions)
            // setShowLabels(true)
            filtering(enteredTag)
        } 
        // else if  ( e.nativeEvent.data === "1" ) {

        //     if (lastWord.includes(priorityOptions) )
        //     {
        //         console.log("....", priority)
        //         priority = lastWord.toUpperCase()
        //     }


        // }
    }

    const filtering = enteredTag => {
        let filteredOptions = origLabelOptions.filter(option =>
            option.includes(enteredTag)
        )
        setLabelOptions(filteredOptions)
        setShowLabels(true)

        if (filteredOptions.length === 0) {
            filteredOptions.push(` -- Create ${enteredTag} --`)
        }
    }

    // return (
    //     <div className="m-10">
    //         <textarea
    //             className="bg-gray-300 w-96 outline-none bg-transparent"
    //             value={content}
    //             onChange={handleContentChange}
    //             placeholder="here..."
    //         ></textarea>

    //         <p className="m-10">
    //             {content.split(" ").map((w, index) => {
    //                 if (
    //                     w.startsWith("@") ||
    //                     w.startsWith("#") ||
    //                     w.startsWith("/")
    //                 ) {

    //                     return (
    //                         <>
    //                             <span className="bg-red-200" key={index}>
    //                                 {w}
    //                             </span>{" "}
    //                         </>
    //                     )
    //                 } else {

    //                     return (
    //                         <>
    //                             <span key={index}>{w}</span>{" "}
    //                         </>
    //                     )
    //                 }
    //             })}
    //         </p>

    //         <p className="w-1/2 border-black mt-10"></p>

    //         <TagContainer  tagsProp={tagsProp} />

    //         {showLabels && <LabelList labelOptions={labelOptions} />}
    //     </div>
    // )

    return (
        <div className="relative w-screen h-screen">
            <form
                className="flex flex-col bg-dark1  border rounded-md border-gray-600 mt-4 w-96 ml-10"
                // onSubmit={handleSubmit}
            >
                <div className=" p-5 flex flex-col relative">
                    <textarea
                        type="text"
                        name=""
                        id=""
                        placeholder="Task name"
                        className="bg-transparent outline-none border-none text-sm  border-red-200 text-transparent "
                        value={content}
                        onChange={handleContentChange}
                        // onKeyDown={}
                    ></textarea>

                    <p className="m-10 absolute -top-4 ">
                        {content.split(" ").map((w, index) => {
                            if (
                                w.startsWith("@") ||
                                w.startsWith("#") ||
                                w.startsWith("/") || 
                                priorityOptions.includes(w.toLowerCase())
                            ) {
                                return (
                                    <>
                                        <span
                                            className="bg-red-200"
                                            key={index}
                                        >
                                            {w}
                                        </span>{" "}
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <span key={index}>{w}</span>{" "}
                                    </>
                                )
                            }
                        })}
                    </p>

                    <textarea
                        placeholder="Description"
                        className="bg-transparent outline-none border-none text-xs mt-3"
                        value={description}
                        // onChange={e => {
                        //     setDescription(e.target.value)
                        // }}
                    ></textarea>

                    <div className="flex gap-2 mt-3">
                        <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                            <BsCalendar3 fontSize={15} className="text-white" />
                        </div>

                        {

                            priority !== null ? (  <div className="p-2 bg-transparent border-2 bor border-gray-600 rounded-md cursor-pointer">
                            <BsFlag fontSize={15} className="text-white" />{priority}
                        </div>) : (  <div className="p-2 bg-transparent border-2 bor border-gray-600 rounded-md cursor-pointer">
                            <BsFlag fontSize={15} className="text-white" />
                        </div>)
                        }


                      

                        {tagsProp.length === 0 && (
                            <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                                <AiOutlineTag
                                    fontSize={15}
                                    className="text-white"
                                />
                            </div>
                        )}

                        {tagsProp.length === 1 &&
                            tagsProp.map(item => {
                                return (
                                    <div className=" flex items-center p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer text-xs">
                                        <AiFillTag
                                            fontSize={15}
                                            className="text-white"
                                        />
                                        {item}
                                        <AiOutlineClose
                                            fontSize={10}
                                            className=""
                                        />
                                    </div>
                                )
                            })}

                        {tagsProp.length > 1 && (
                            <>
                                <div className=" flex items-center p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer text-xs">
                                    <AiFillTag
                                        fontSize={15}
                                        className="text-white"
                                    />
                                    {tagsProp[tagsProp.length - 1]}
                                    <AiOutlineClose
                                        fontSize={10}
                                        className=""
                                    />
                                </div>
                                <div className=" flex items-center p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer text-xs">
                                    <AiFillTag
                                        fontSize={15}
                                        className="text-white"
                                    />
                                    {tagsProp.length - 1}
                                    <AiOutlineClose
                                        fontSize={10}
                                        className=""
                                    />
                                </div>
                            </>
                        )}

                        {/* <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                            <AiOutlineTag
                                fontSize={15}
                                className="text-white"
                            />
                        </div>
                        <div className=" flex items-center p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer text-xs">
                            <AiFillTag fontSize={15} className="text-white" />{" "}
                            wip
                            <AiOutlineClose fontSize={10} className="" />
                        </div> */}
                        {/* <TagContainer tagsProp={tagsProp} /> */}
                        <div className="p-2 bg-transparent border-2 border-gray-600 rounded-md cursor-pointer">
                            <MdOutlineMoreHoriz
                                fontSize={15}
                                className="text-white"
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="flex px-5 py-2 justify-between items-center">
                    <div className="text-sm">Inbox</div>
                    <div className="flex gap-2">
                        <div
                            className="p-2 bg-gray-500 opacity-30 rounded-sm cursor-pointer"
                            onClick={() => {
                                setShowForm(false)
                            }}
                        >
                            <AiOutlineClose fontSize={18} />
                        </div>
                        <button className="p-2 bg-red-500 opacity-30 rounded-sm cursor-pointer">
                            <IoMdSend className="text-slate-50" fontSize={18} />
                        </button>
                    </div>
                </div>
            </form>

            {showLabels && (
                <div className="absolute w-full top-5 left-32">
                    <LabelList labelOptions={labelOptions} />
                </div>
            )}
        </div>
    )
}

export default App

const TagContainer = ({ tagsProp }) => {
    const [tags, setTags] = useState(tagsProp)

    return (
        <p className="w-10/12 border-black border-2 mt-10 p-4 ">
            {tags?.map(tag => (
                <Tag tag={tag} />
            ))}
        </p>
    )
}

// const TagContainer = ({ tagsProp }) => {
//     const [tags, setTags] = useState(tagsProp)

//     return (
//         <p className="w-10/12 border-black border-2 mt-10 p-4">
//             {tags?.map(tag => (
//                 <>
//                     <span>*{tag}</span>{" "}
//                 </>
//             ))}
//         </p>
//     )
// }

const Tag = ({ tag }) => {
    return (
        <div className="flex items-center justify-center p-4 ">
            <AiOutlineTag fontSize={10} className="text-white inline" />
            <span className="text-xs">{tag}</span>
        </div>
    )
}

const LabelList = ({ labelOptions }) => {
    useEffect(() => {
        return () => {}
    }, [])

    return (
        <div className="bg-blue-200 w-1/2 text-center mt-10 flex flex-col  p-0">
            {labelOptions.map((label, index) => {
                return (
                    // <p key={index} className="p-2">
                    //     {label}
                    // </p>

                    <Tag tag={label} />
                )
            })}
        </div>
    )
}
