import { AiOutlineTag } from "react-icons/ai"

const LabelList = ({ labels }) => {
    return (
        <>
            <span className="inline">
                <AiOutlineTag className="inline mr-1" fontSize={10} />
                {labels[0].name}
            </span>
            {labels.length > 1 && <span>+ {labels.length - 1}</span>}
        </>
    )
}

export default LabelList
