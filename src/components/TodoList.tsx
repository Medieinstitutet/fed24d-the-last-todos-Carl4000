import { useState, type ChangeEvent } from 'react';
import { Task } from '../models/Task';
import './TodoList.css';

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localData = localStorage.getItem('tasks');

    if (localData) {
      const localDataParsed = JSON.parse(localData);
      return localDataParsed.map((t: Task) => new Task(t.id, t.task, t.done));
    } else {
      return [
        new Task(1, 'Lots of React coding', false),
        new Task(2, 'Understand reducers', false),
        new Task(3, 'Focus on destructuring', false),
      ];
    }
  });

  // Ta bort ur listan
  const removeTask = (id: number) => {
    const taskList = tasks.filter((t) => t.id !== id);
    setTasks(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  const updateTask = (id: number, done: boolean) => {
    const taskList = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, done: done };
      }
      return t;
    });
    setTasks(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      const id = +e.target.id;

      updateTask(id, e.target.checked);
    }
  };

  return (
    <>
      <div className="wrapper">
        <h3>My little todo list</h3>
        <ul className="task-list">
          {tasks.map((t) => (
            <li className="task-item" key={t.id}>
               <div className="task"><h2>{t.task}</h2></div>
              <div className="task-operator">
                <label>
                Mark as done:
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={handleChange}
                  id={String(t.id)}
                />
              </label>
              <button onClick={() => removeTask(t.id)}>Remove task</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
