import { type } from 'os';
import React, { ChangeEvent, useState } from 'react';
import { FilterValueTypes } from '../App';
import { VscGitPullRequestGoToChanges, VscDebug} from "react-icons/vsc";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (value: FilterValueTypes, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  filter: FilterValueTypes
}

export function Todolist(props: PropsType) {
  let [newTaskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { 
    setTaskTitle(e.currentTarget.value)
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               placeholder='Add task'
               onChange={ onNewTitleChangeHandler }
               className={error ? "error" : ""}
               onKeyPress={ onKeyPressHandler }
        />
        <button onClick={ addTask } ><VscGitPullRequestGoToChanges /></button>
         {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            };

            return <li className={t.isDone ? 'is-done' : ""} key={t.id}><input
                       type={"checkbox"}
                       checked={t.isDone}
                       onChange={ onChangeHandler }
                    />
              <span>{t.title}</span>
              <button onClick={ onClickHandler } ><VscDebug /></button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ""} onClick={ () => { props.changeFilter("all", props.id) } } >All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ""} onClick={ () => { props.changeFilter("active", props.id) } } >Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ""} onClick={ () => { props.changeFilter("completed", props.id) } } >Completed</button>
      </div>
    </div>
  );
}
