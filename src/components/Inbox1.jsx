import React, { useState } from "react"

let tagsProp = []

function App() {
    const origOptions = ["wip", "sip", "buy"]
    const [content, setContent] = useState("")
    const [showLabels, setShowLabels] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [labelOptions, setLabelOptions] = useState(origOptions)
    
    

    // let tags = ["tag-1","tag-2"]

    

    const handleContentChange = e => {
        // console.log(e.nativeEvent.data, "----", e.target.value)

        let words = e.target.value.split(" "); 
        // console.log('words', words)

        let lastWord = words[words.length - 2]
        // console.log(`lastWord:: ..${lastWord}..` )

        setContent(e.target.value)
        // console.log("14 content", content)

        if (e.nativeEvent.data === "@") {
            setLabelOptions(origOptions)
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

            // const origOptions = origOptions.filter(option =>
            //     option.startsWith(enteredTag)
            // )
            // setLabelOptions(filteredOptions)
            // setShowLabels(true)

            if (enteredTag.length === 0) {
                setLabelOptions(origOptions)
                setShowLabels(false)
            } else {
                
                // const filteredOptions = origOptions.filter(option =>
                //     option.includes(enteredTag)
                // )
                // setLabelOptions(filteredOptions)
                // setShowLabels(true)
                filtering(enteredTag)




            }
        } 
        
        else if (e.nativeEvent.data === " ") {
            // console.log('64' , lastWord)
            setShowLabels(false)
            setLabelOptions(origOptions)
            lastWord.startsWith("@") && tagsProp.push(lastWord.slice(1))
        }


        else if (showLabels && e.nativeEvent.data !== "@") {
            const tagStartIndex = e.target.value.lastIndexOf("@")
            const enteredTag = e.target.value.substring(tagStartIndex + 1)

            // const filteredOptions = origOptions.filter(option =>
            //     option.includes(enteredTag)
            // )
            // setLabelOptions(filteredOptions)
            // setShowLabels(true)
            filtering(enteredTag)






        } 
    }

    const filtering = enteredTag => {



        let filteredOptions = origOptions.filter(option =>
            option.includes(enteredTag)
        )
        setLabelOptions(filteredOptions)
        setShowLabels(true)

        if(filteredOptions.length === 0){

            filteredOptions.push(` -- Create ${enteredTag} --`)
          
          }



    }

    

    return (
        <div className="m-10">
            <textarea
                className="bg-gray-300 w-96 outline-none bg-transparent"
                value={content}
                onChange={handleContentChange}
                placeholder="here..."
            ></textarea>

            <p className="m-10">
                {content.split(" ").map((w, index) => {
                    if (
                        w.startsWith("@") ||
                        w.startsWith("#") ||
                        w.startsWith("/")
                    ) {

                        
                        return (
                            <>
                                <span className="bg-red-200" key={index}>
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

            <p className="w-1/2 border-black mt-10"></p>
            
            
            <TagContainer  tagsProp={tagsProp} />


            {showLabels && <LabelList labelOptions={labelOptions} />}
        </div>
    )
}

export default App

const LabelList = ({ labelOptions }) => {
    return (
        <div className="bg-blue-200 w-1/2 text-center mt-10">
            {labelOptions.map((label, index) => {
                return (
                    <p key={index} className="p-2">
                        {label}
                    </p>
                )
            })}
        </div>
    )
}



const TagContainer = ({tagsProp}) => {
    const [tags,setTags] = useState(tagsProp)
    
  return ( <p className="w-10/12 border-black border-2 mt-10 p-4">
    {tags?.map((tag)=> (

        <>
         <span>*{tag}</span>{" "}
        </>
         
         )
     )}


  </p> )
}


