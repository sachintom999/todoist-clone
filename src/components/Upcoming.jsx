import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

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

const Upcoming = () => {
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

    const [items,setItems] = useState(initItems)
    const [itemsNew,setItemsNew] = useState(initItemsNew)
    
    

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items1 = reorder(
          items,
          result.source.index,
          result.destination.index
        );
    
       

        setItems(items1)
      
    
    
    }
    

    return (
        <div className="w-full">

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                
                {(provided, snapshot) => (
                    <>
                    
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
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
                   
                    </>
                )}
            </Droppable>
        </DragDropContext>

        </div>

    )
}

export default Upcoming
