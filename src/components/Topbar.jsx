import { useNavigate } from "react-router-dom"
import { AiOutlineBell, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import { BiSolidUserCircle } from "react-icons/bi"
import { BsCheckCircle, BsQuestionCircle } from "react-icons/bs"
import { FaStar } from "react-icons/fa"

import { GoSearch } from "react-icons/go"
import { GrHomeRounded } from "react-icons/gr"
import { useDispatch } from "react-redux"
import {
    fetchTaskDetail,
    openTaskDetailForm,
    searchTasks,
    updateaddTaskModal,
} from "../redux/tasks"
import getIcon from "../utils/getIcons"

import { useState } from "react"
import { useSelector } from "react-redux"
import ProjectItem from "./Common/ProjectItem"
import LabelItem from "./Common/LabelItem"
import SectionItem from "./Common/SectionItem"
import TaskItem from "./Common/TaskItem"

const Topbar = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const [recentlyViewed, setRecentlyViewed] = useState([])

    const navigate = useNavigate()

    const { searchResults } = useSelector(state => state.tasks)

    const { appState } = useSelector(state => state.tasks)

    console.log("searchResults", searchResults)

    const handleSubmit = e => {
        e.preventDefault()

        setRecentSearches([...recentSearches.slice(-4), searchTerm])
    }

    const navigateToItem = (itemType = "project", id) => {
        setShowDropdown(false)

        if (itemType === "project") {
            navigate(`/project/${id}`)
        } else if (itemType === "label") {
            navigate(`/label/${id}`)
        } else if (itemType === "task") {
            dispatch(fetchTaskDetail(id)).then(() => {
                dispatch(openTaskDetailForm(id))
            })
        } else if (itemType === "section") {
            const { project, section } = id
            navigate(`/project/${project}#section-${section}`)
        }
    }

    return (
        <div className="w-full bg-gray-100 ` h-10 p-2 flex justify-between text-xs font-light">
            <div className="flex justify-around">
                <AiOutlineMenu fontSize={20} />
                <GrHomeRounded fontSize={20} />
                <GoSearch fontSize={20} />
                <div className="search-container relative w-72 ">
                    <form className="flex" onSubmit={handleSubmit}>
                        <input
                            className="text-xs w-11/12"
                            type="text"
                            placeholder="Search"
                            onChange={e => {
                                setSearchTerm(e.target.value)
                                setShowResults(true)
                                console.log("....", searchTerm)

                                dispatch(searchTasks(searchTerm))
                            }}
                            value={searchTerm}
                            onFocus={() => {
                                setShowResults(false)
                                setShowDropdown(true)
                            }}
                        />
                        {getIcon("close", {
                            onClick: () => {
                                setShowDropdown(false)
                            },
                        })}
                    </form>

                    {showDropdown && (
                        <div className="dropdown bg-gray-600 absolute top-9 w-full h-72 z-10 text-slate-300 px-2 overflow-y-auto py-2 rounded-md">
                            {!showResults && (
                                <>
                                    <div className="search-section mb-5">
                                        {recentSearches.length > 0 && (
                                            <div className="flex justify-between">
                                                <h3 className="font-bold">
                                                    Recent searches
                                                </h3>
                                                <p
                                                    onClick={() => {
                                                        setRecentSearches([])
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    Clear
                                                </p>
                                            </div>
                                        )}
                                        {
                                            // console.log('recentSearches', recentSearches)
                                            recentSearches?.map(item => {
                                                return (
                                                    <p
                                                        className="p-2 cursor-pointer"
                                                        onClick={() => {
                                                            setSearchTerm(item)
                                                            setShowResults(true)
                                                            dispatch(
                                                                searchTasks(
                                                                    searchTerm
                                                                )
                                                            )
                                                        }}
                                                    >
                                                        {getIcon("history", {
                                                            className: "mr-2",
                                                        })}
                                                        {item}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="view-section h-24">
                                        <h3 className="font-bold">
                                            Recently viewed
                                        </h3>
                                    </div>
                                </>
                            )}

                            {showResults && (
                                <>
                                    {searchResults?.projects?.map(project => {
                                        return (
                                            <div
                                                className="w-full text-white p-2"
                                                onClick={() => {
                                                    navigateToItem(
                                                        "project",
                                                        project._id
                                                    )
                                                }}
                                            >
                                                <ProjectItem
                                                    project={project}
                                                />
                                            </div>
                                        )
                                    })}
                                    {searchResults?.sections?.map(section => {
                                        return (
                                            <div
                                                className="w-full text-white p-2"
                                                onClick={() => {
                                                    navigateToItem(`section`, {
                                                        project:
                                                            section.project._id,
                                                        section: section._id,
                                                    })
                                                }}
                                            >
                                                <SectionItem
                                                    section={section}
                                                />
                                            </div>
                                        )
                                    })}
                                    {searchResults?.labels?.map(label => {
                                        return (
                                            <div
                                                className="w-full text-white p-2"
                                                onClick={() => {
                                                    navigateToItem(
                                                        "label",
                                                        label._id
                                                    )
                                                }}
                                            >
                                                <LabelItem label={label} />
                                            </div>
                                        )
                                    })}
                                    {searchResults?.tasks?.map(task => {
                                        return (
                                            <div
                                                className="w-full text-white p-2"
                                                onClick={() => {
                                                    navigateToItem(
                                                        "task",
                                                        task._id
                                                    )
                                                }}
                                            >
                                                <TaskItem task={task} />
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {appState.online ? "Online" : "Offline"}

            <div className="flex justify-around">
                <button className="flex">
                    <FaStar className="text-yellow-500" fontSize={15} />
                    <span>Upgrade to Pro</span>
                </button>
                <AiOutlinePlus
                    fontSize={20}
                    onClick={() => {
                        dispatch(
                            updateaddTaskModal({
                                show: true,
                                // data: { title, _id },
                            })
                        )
                    }}
                />
                <BsCheckCircle fontSize={20} />
                <span>8/5</span>
                <BsQuestionCircle fontSize={20} />
                <AiOutlineBell fontSize={20} />
                <BiSolidUserCircle fontSize={20} />
            </div>
        </div>
    )
}

export default Topbar
