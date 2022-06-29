import React from 'react';

import './GroceriesList.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: "white",
  padding: grid
});

const GroceriesList = props => {

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.groceries,
      result.source.index,
      result.destination.index
    );

    console.log(JSON.stringify(props.groceries));
    console.log(JSON.stringify(items));

    props.onSort(items);
  }

  return (
    <section className="groceries-list">
      <h2>Groceries</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div className='groceryItemContainer'
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {props.groceries.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div className='groceryItem'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      //onClick={props.onRemoveItem.bind(this, item.id)}
                    >
                      {item.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default GroceriesList;
