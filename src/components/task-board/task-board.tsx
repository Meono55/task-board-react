import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CreatTask from '../createTask/CreateTask'
import {v4 as uuid} from 'uuid';

const TaskBoard = () => {

    const mockTasks = [
        {id: uuid(), title: 'Test', subTitle: 'Test1', text: 'This is just a test1'},
        {id: uuid(), title: 'Test2', subTitle: 'Test2', text: 'This is just a test2'}
      ]
      
      const mockedColumns = {
        new: {
          name: 'New',
          items: mockTasks
        },
        inprogress : {
          name: 'In Progress',
          items: []
        }
  
        ,
        inqa : {
          name: 'In QA',
          items: []
        }
        ,
        completed : {
          name: 'Completed',
          items: []
        }
      }


const [columns, setColumns] = useState(mockedColumns);


function addNewTask(inputs){
    const mockData = {
        id: uuid(),
        title: inputs.title,
        subTitle: inputs.subTitle,
        text: inputs.text
    }
    const tempItems = [...columns['new'].items, mockData]
    setColumns({
        ...columns,
        ['new'] : {
            ...columns['new'],
            items: tempItems
        }})
}

function onDragEnd(result, columns, setColumns){
    if(!result.destination){
      return;
    }
    const {source, destination} = result;
    if(source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId] : {
          ...column,
          items: copiedItems
        },
      })
    }

  }


  return (
    <div className="mainPage">
      <CreatTask onParentClick={addNewTask}/>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="title">
              <h2>{column.name}</h2>
            <div style={{margin: 8}}>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div
                  {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      width: 250,
                      minHeight: 500
                    }}>
                      {(column.items as any[]).map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div className="taskDisplay" ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  ...provided.draggableProps.style
                                }}>
                                  <p>{item.title}</p>
                                  <p>{item.subTitle}</p>
                                  <p>{item.text}</p>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}  
                      {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
            </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default TaskBoard