import React, { useState, useEffect } from "react"

const GlobalKeyboardShortcuts = () => {
    const [keysPressed, setKeysPressed] = useState([])
    console.log("keysPressed", keysPressed)

    useEffect(() => {
        const handleKeyDown = event => {
            setKeysPressed(prevKeys => {
                return [...prevKeys, event.key]
            })

            console.log(keysPressed)
            console.log(keysPressed.join(""))

            if (keysPressed.join("") === "gk") {
                console.log("Shortcut triggered: G then K")

                setKeysPressed([])
            }
        }

        const handleKeyUp = () => {
            setKeysPressed([])
        }

        document.addEventListener("keydown", handleKeyDown)
        // document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [keysPressed])

    return <div>Global Keyboard Shortcuts Example</div>
}

export default GlobalKeyboardShortcuts
