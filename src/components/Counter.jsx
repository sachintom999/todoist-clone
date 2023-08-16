import { useState, memo } from "react"
const Counter = () => {
    console.log("child")
    const [counter, setCounter] = useState(0)

    return (
        <div>
            <p>{counter}</p>
            <button
                onClick={() => {
                    setCounter(prev => {
                        return prev + 1
                    })
                }}
            >
                +
            </button>
        </div>
    )
}

export default memo(Counter)
