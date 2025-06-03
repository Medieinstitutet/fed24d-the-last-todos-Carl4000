import { useState, type ChangeEvent } from "react"
import { Task } from "../models/Task"

export const TodoList = () => {
    const [tasks, setTasks] = useState<Task[]>([
        new Task(1, "Koda", false),
        new Task(2, "Felsöka", false),
        new Task(3, "Tvätta bilen", false),
        
    ]);

    // Ta bort ur listan
    const removeTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.type === "checkbox") {
        setTasks({ ...tasks, [e.target.id]: e.target.checked });
        }


    }

    return <>
        <div>
            
            {tasks.map((t) => <div key={t.task}>
                <h3>{t.task}</h3>
                <input type="checkbox" checked={t.done} onChange={handleChange} id={t.id} />
                <button onClick={() => removeTask(t.id)} >Ta bort</button>
            </div>)}

        
        </div>
    
    </>

};