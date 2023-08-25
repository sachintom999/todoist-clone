import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"



const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
    }))

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 300,
})

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

const grid = 8

const getInitialListData = () => {
    return [
        {
            id: "list-1",
            items: getItems(10),
        },
        {
            id: "list-2",
            items: getItems(5, 10),
        },
        // Add more lists as needed
    ]
}

// ... (reorder, move, styles remain the same) ...

const UpcomingDynamic = () => {

    const sampleData = 

    [

        {
            id:"list-1",
            items:[

                {
                    id:"item-0",
                    content:"item 0"
                },

                {
                    id:"item-1",
                    content:"item 1"
                },
                {
                    id:"item-2",
                    content:"item 2"
                },

               




            ]
        },
        {
            id:"list-2",
            items:[


                {
                    id:"item-10",
                    content:"item 10"
                },
                {
                    id:"item-11",
                    content:"item 11"
                },
                
                
                







            ]
        },



    ]
    
    
    
    
    // const [lists, setLists] = useState(getInitialListData())
    const [lists, setLists] = useState(sampleData)







    console.log(lists)

    // const getList = id => lists[id]

    const getList = droppableId => {
        const qq = lists.find(item => {
            return item.id === droppableId
        })
        return qq
    }

    // const onDragEnd = result => {
    //     const { source, destination } = result

    //     console.log('source.... ', source )
    //     console.log('destination.... ', destination )


    //     if (source.droppableId === destination.droppableId) {
    //         const updatedList = reorder(
    //             getList(source.droppableId).items,
    //             source.index,
    //             destination.index
    //         )

    //         console.log('updatedList', updatedList)

    //         setLists(prevLists => {
    //             return prevLists.map(list =>
    //                 list.id === source.droppableId
    //                     ? { ...list, items: updatedList }
    //                     : list
    //             )
    //         })
    //     } else {
    //         const updatedSourceList = move(
    //             getList(source.droppableId).items,
    //             getList(destination.droppableId).items,
    //             source,
    //             destination
    //         )

    //         console.log('from MOVE updatedSourceList---', updatedSourceList)

    //         setLists(prevLists => {
    //             const newList = prevLists.map(list =>
    //                 list.id === source.droppableId
    //                     ? { ...list, items: updatedSourceList }
    //                     : list.id === destination.droppableId
    //                     ? { ...list, items: updatedSourceList }
    //                     : list
    //             )

    //             console.log("newList", newList)

    //             return newList
    //         })

    //         // console.log("lists", lists)
    //     }
    // }


    const onDragEnd = result => {
        const { source, destination } = result;
    
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId) {
            const listToUpdate = lists.find(list => list.id === source.droppableId);
            const updatedItems = Array.from(listToUpdate.items);
            const [removed] = updatedItems.splice(source.index, 1);
            updatedItems.splice(destination.index, 0, removed);
    
            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id === source.droppableId
                        ? { ...list, items: updatedItems }
                        : list
                );
            });
        } else {
            const sourceListToUpdate = lists.find(list => list.id === source.droppableId);
            const destinationListToUpdate = lists.find(list => list.id === destination.droppableId);
    
            const updatedSourceItems = Array.from(sourceListToUpdate.items);
            const updatedDestinationItems = Array.from(destinationListToUpdate.items);
    
            const [removed] = updatedSourceItems.splice(source.index, 1);
            updatedDestinationItems.splice(destination.index, 0, removed);
    
            setLists(prevLists => {
                return prevLists.map(list =>
                    list.id === source.droppableId
                        ? { ...list, items: updatedSourceItems }
                        : list.id === destination.droppableId
                        ? { ...list, items: updatedDestinationItems }
                        : list
                );
            });
        }
    };
    


    return (
        <div className="w-screen h-screen">
            <DragDropContext onDragEnd={onDragEnd}>
                
                
                
                {lists.map(list => (
                    <Droppable key={list.id} droppableId={list.id}>
                        {(provided, snapshot) => {
                            // console.log("lists", lists)
                            return (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    {list?.items?.map((item, index) => {
                                        // console.log('item---', item)

                                        return (
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
                                                            provided
                                                                .draggableProps
                                                                .style
                                                        )}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                ))}



                
            </DragDropContext>
        </div>
    )
}

export default UpcomingDynamic
