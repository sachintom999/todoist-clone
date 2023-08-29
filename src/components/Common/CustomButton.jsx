export default function CustomButton(props) {
    return (
        <button
            className={`p-2 text-white rounded-md hover:opacity-80 transition delay-75 font-bold ${props.additionalClass} text-xs `}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}
