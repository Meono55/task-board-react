import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CreatTask from '../createTask/CreateTask'
import TaskCard from '../task-card/TaskCard'
import {v4 as uuid} from 'uuid';
import '../task-board/task-board.css'
import TaskService from '../../services/TaskService';


const taskService = TaskService()
const mockedColumns = {
  new: {
    name: 'New',
    status: 'NEW',
    items: []
  },
  inprogress : {
    name: 'In Progress',
    status: 'INPROGRESS',
    items: []
  }

  ,
  inqa : {
    name: 'In QA',
    status: 'INQA',
    items: []
  }
  ,
  completed : {
    name: 'Completed',
    status: 'COMPLETED',
    items: []
  }
}

const TaskBoard = () => {

    const [tasks, setTasks] = useState({});
    const [columns, setColumns] = useState(mockedColumns);
 
      useEffect(() => {
        const fetchData = async () => {
          taskService.retrieveAllTasks().then((response) => {
            setTasks(response.data);
            let tempColumns = columns;
            for (const [status, task] of Object.entries(tasks)){
              if(tempColumns[status.toLowerCase()]){
                tempColumns[status.toLowerCase()].items = task;
              }
            }
            setColumns(tempColumns)
          });
        }
        fetchData();
      }, [tasks])

function addNewTask(inputs){
    const newTask = {
        id: +uuid(),
        title: inputs.taskTitle,
        text: inputs.description,
        status: inputs.status,
        taskDetail: {}
    }
    const tempItems = [...columns[inputs.status.toLowerCase()].items, newTask]
    setColumns({
        ...columns,
        [inputs.status.toLowerCase()] : {
            ...columns[inputs.status.toLowerCase()],
            items: tempItems
        }});
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
                          <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div className="taskDisplay" ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  // backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  ...provided.draggableProps.style
                                }}>
                                <TaskCard item={item} column={column.name}></TaskCard>
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