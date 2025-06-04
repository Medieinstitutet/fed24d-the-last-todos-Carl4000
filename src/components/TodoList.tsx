import { useState, type ChangeEvent } from "react"
import { Task } from "../models/Task"

export const TodoList = () => {
    const [tasks, setTasks] = useState<Task[]>(() => { 
      
      const localData = localStorage.getItem("tasks");

      if (localData) {
        const localDataParsed = JSON.parse(localData)
        return localDataParsed.map((t: Task) => new Task(t.id, t.task, t.done));
      } else  {
        return [
        new Task(1, "Koda", false),
        new Task(2, "Felsöka", false),
        new Task(3, "Tvätta bilen", false),
        ];
      }
    });

    // Ta bort ur listan
    const removeTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const updateTask = (id: number, done: boolean) => {
    setTasks(tasks.map((t) => {
        if (t.id === id) {
          return { ...t, done: done };
        }
        return t;
      })
    );
  };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      const id = +e.target.id; 
      updateTask(id, e.target.checked);
    }
  };
    

    return <>
        <ul>
            
            {tasks.map((t) => <li key={t.id}>
                <h4>{t.task}</h4>
                Done: <input type="checkbox" checked={t.done} onChange={handleChange} id={String(t.id)} />
                <br></br>
                <button onClick={() => removeTask(t.id)} >Ta bort</button>
            </li>)}

        
        </ul>
    
    </>

};