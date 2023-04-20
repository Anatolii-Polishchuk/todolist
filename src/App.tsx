import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';
import { type } from 'os';

export type FilterValueTypes = "all" | "active" | "completed";
type TodolistType = {
  id: string
  title: string
  filter: FilterValueTypes
}


function App() {

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todoListId] = filteredTasks;

    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false
    };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValueTypes, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodolists([...todoLists]);
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();
  
  let [ todoLists, setTodolists ] = useState<Array<TodolistType>>([
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What need", filter: "all"}
  ]);

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "JavaScript", isDone: false },
      { id: v1(), title: "Java", isDone: false }
    ],

    [todoListId2]: [
      { id: v1(), title: "Books", isDone: false },
      { id: v1(), title: "Food", isDone: true }
    ]
  });


  return (
    <div className="App">
      {
        todoLists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === "active") {
             tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
          />
        })
      }
    </div>
  );
}

export default App;
