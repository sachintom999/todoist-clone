import "react-circular-progressbar/dist/styles.css"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
const Inbox = () => {
    return (
        <div className="w-8 h-8">
            <CircularProgressbar
                value={25}
                strokeWidth={150}
                styles={buildStyles({
                    strokeLinecap: "butt",
                })}
            />
        </div>
    )
}

export default Inbox
