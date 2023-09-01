// export default function UpcomingNew() {
//     return <div className="h-screen w-screen">---- UpcomingNew -----</div>
// }

import { useState } from "react"
import Calendar from "react-calendar"

import 'react-calendar/dist/Calendar.css';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UpcomingNew() {
    const [value, onChange] = useState(new Date())

    return (
        <div className="h-screen w-screen">
            <Calendar onChange={onChange} value={value} defaultView="month"  />
        </div>
    )
}
