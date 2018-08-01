import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import trash from '../assets/trash.svg';

import './List.css';


const List = ({ placemarks, onDragListItemEnd, onOpenBalloon, onDeletePlacemark }) => (
  <DragDropContext onDragEnd={onDragListItemEnd}>
    <div className="List">
      <h2 className="header">Маршрут</h2>
      <Droppable droppableId="someId">
        {dropProvided => (
          <ol
            className="List-Items"
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {placemarks.map((placemark, index) => (
              <Draggable key={index} draggableId={placemark.properties.balloonContent} index={index}>
                {(dragProvided, snapshot) => (
                  <li
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    ref={dragProvided.innerRef}
                    onClick={onOpenBalloon(index)}
                    className={`List-Item ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <div className="List-Item--content">
                      <span>{placemark.properties.balloonContent}</span>
                      <button
                        className="List-Item--remove"
                        onClick={onDeletePlacemark(index)}
                      >
                        <img src={trash} alt="trash" />
                      </button>
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
  onDragListItemEnd: PropTypes.func,
  onOpenBalloon: PropTypes.func.isRequired,
  onDeletePlacemark: PropTypes.func.isRequired,
};

export default List;
