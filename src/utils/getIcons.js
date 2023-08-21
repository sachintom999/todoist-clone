import React from "react"
import {
    AiFillPlusCircle,
    AiOutlineBell,
    AiOutlineBranches,
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineMenu,
    AiOutlinePlus,
    AiOutlineTag,
    AiOutlineTags,
} from "react-icons/ai"
import {
    BiCategory,
    BiComment,
    BiSolidUserCircle,
    BiInfoCircle,
} from "react-icons/bi"
import {
    BsCalendar3,
    BsCheck,
    BsCheckCircle,
    BsEmojiSmile,
    BsFillMicFill,
    BsFlag,
    BsFlagFill,
    BsInbox,
    BsQuestionCircle,
} from "react-icons/bs"
import { FaStar } from "react-icons/fa"
import { FiAlertCircle } from "react-icons/fi"
import { GoSearch } from "react-icons/go"
import { GrHomeRounded } from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { IoIosMore, IoMdSend } from "react-icons/io"
import {
    MdKeyboardArrowRight,
    MdOutlineAddReaction,
    MdOutlineMoreHoriz,
    MdToday,
} from "react-icons/md"
import { TbSection } from "react-icons/tb"

const iconMappings = {
    check: AiOutlineCheck,
    alert: FiAlertCircle,
    alert: AiOutlinePlus,
    alert: BiCategory,
    alert: BsCalendar3,
    alert: AiOutlinePlus,
    category: BiCategory,
    calendar: BsCalendar3,
    inbox: BsInbox,
    today: MdToday,
    plusCirlce: AiFillPlusCircle,
    tag: AiOutlineTag,
    bell: AiOutlineBell,
    menu: AiOutlineMenu,
    user: BiSolidUserCircle,
    check: BsCheckCircle,
    question: BsQuestionCircle,
    star: FaStar,
    search: GoSearch,
    alert: GrHomeRounded,
    section: TbSection,
    branch: AiOutlineBranches,
    more: IoIosMore,
    comment: BiComment,
    close: AiOutlineClose,
    flag: BsFlag,
    send: IoMdSend,
    more: MdOutlineMoreHoriz,
    alert: AiOutlineCheck,
    alert: AiOutlineTags,
    alert: FiAlertCircle,
    addReaction: MdOutlineAddReaction,
    emoji: BsEmojiSmile,
    mic: BsFillMicFill,
    attachment: ImAttachment,
    flag: BsFlagFill,
    check: BsCheck,
    arrowRight: MdKeyboardArrowRight,
    info: BiInfoCircle,
    // Add more mappings here
}

const getIcon = (name, props = { fontSize: 20 }) => {
    const IconComponent = iconMappings[name]
    const { className, ...restProps } = props

    const defaultClassName = "inline" // Default className

    const mergedClassName = className
        ? `${defaultClassName} ${className}`
        : defaultClassName

    return IconComponent
        ? React.createElement(IconComponent, {
              ...restProps,
              className: mergedClassName,
          })
        : null
}

export default getIcon
