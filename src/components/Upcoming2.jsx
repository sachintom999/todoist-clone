
import { pl } from 'date-fns/locale';
import {useState} from 'react'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"



let initItems = [
    { id: "item-0", content: "item 0" },
    { id: "item-1", content: "item 1" },
    { id: "item-2", content: "item 2" },
    { id: "item-3", content: "item 3" },
    { id: "item-4", content: "item 4" },
]
let initItemsNew = [
    { id: "item-10", content: "item 10" },
    { id: "item-11", content: "item 11" },
   
]


const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
})



const Upcoming2 = () => {




    const [items,setitems] = useState(getItems(10))
    const [selected,setSelected] = useState(getItems(5, 10))

    // console.log('items', items)
    // console.log('selected', selected)
    
    

    const id2List = {
        droppable: "items",
        droppable2: "selected",
    }


    const getList = id => id2List[id]

    const onDragEnd = result => {
        const { source, destination } = result

        console.log({source,destination})

        // dropped outside the list
        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const items1 = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            )
            console.log(115,"{==115}")

            let state = { items1 }

            console.log(119,"{==119}")

            if (source.droppableId === "droppable2") {
                state = { selected: items1 }
                console.log(123,"{==123}")
            }

            // this.setState(state)
            setitems(items1)
                console.log(128,"{==128}")


        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            )

            setitems(result.droppable)
            setSelected(result.droppable2)

           
        }
    }





    return (

        <div className="w-screen h-screen">

        
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        key={"1"}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        key={"2"}

                    >
                        {selected.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        </div>
    )
}

export default Upcoming2
