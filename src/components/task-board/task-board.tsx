import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CreatTask from '../createTask/CreateTask'
import TaskCard from '../task-card/TaskCard'
import { v4 as uuid } from 'uuid';
import '../task-board/task-board.css'
import TaskService from '../../services/TaskService';


const taskService = TaskService()
const mockTasks = [
  { id: 3, taskTitle: 'Test', text: 'This is just a test1' },
  { id: 4, taskTitle: 'Test2', text: 'This is just a test2' }
]
const mockedColumns = {
  new: {
    name: 'New',
    status: 'NEW',
    items: []
  },
  inprogress: {
    name: 'In Progress',
    status: 'INPROGRESS',
    items: []
  }
  ,
  inqa: {
    name: 'In QA',
    status: 'INQA',
    items: []
  }
  ,
  completed: {
    name: 'Completed',
    status: 'COMPLETED',
    items: []
  }
}



const TaskBoard = () => {

  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState(mockedColumns);
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      fetchData();
    }
  }, [refresh])

  const fetchData = () => {
    taskService.retrieveAllTasks().then((response) => {
      setTasks(response.data);
      let tempColumns = columns;
      for (const [status, backEndTask] of Object.entries(response.data)) {
        if (tempColumns[status.toLowerCase()]) {
          tempColumns[status.toLowerCase()].items = backEndTask;
        }
      }
      setColumns(tempColumns);
      setLoading(false);
    });
  }



  function addNewTask(inputs) {
    const newTask = {
      id: +uuid(),
      taskTitle: inputs.taskTitle,
      description: inputs.description,
      status: inputs.status,
      taskDetail: {}
    }

    taskService.createTask(newTask);
    setLoading(true);
    setRefresh(true);
  }

  function onDragEnd(result, columns, setColumns) {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
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
        [source.droppableId]: {
          ...column,
          items: copiedItems
        },
      })
    }

  }

  if (!loading) {
    return (
      <div className="mainPage">
        <CreatTask onParentClick={addNewTask} />
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className="title">
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id.toString()} key={id}>
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
                                      <TaskCard item={item} column={column.name} key={item.id}></TaskCard>
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
  } else {
    return (
      <p>Loading....</p>
    )
    
  }



}

export default TaskBoard