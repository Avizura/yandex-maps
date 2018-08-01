import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import trash from './svg/trash.svg';


const List = ({ placemarks, onDragListItemEnd, onOpenBalloon, onDeletePlacemarker }) => (
  <DragDropContext onDragEnd={onDragListItemEnd}>
    <div className="List">
      <h2 className="header">Маршрут</h2>
      <Droppable droppableId="someId">
        {dropProvided => (
          <ol
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {placemarks.map((placemark, index) => (
              <Draggable key={index} draggableId={placemark.properties.balloonContent} index={index}>
                {dragProvided => (
                  <li
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    ref={dragProvided.innerRef}
                    onClick={onOpenBalloon(index)}
                  >
                    <div className="List--item">
                      <span>{placemark.properties.balloonContent}</span>
                      <button onClick={onDeletePlacemarker(index)}><img src={trash} /></button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </ol>
        )}
      </Droppable>
    </div>
  </DragDropContext>
);

List.propTypes = {
  placemarks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDragListItemEnd: PropTypes.func.isRequired,
  onOpenBalloon: PropTypes.func.isRequired,
  onDeletePlacemarker: PropTypes.func.isRequired,
};

export default List;
