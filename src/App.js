import React, { useState } from "react";
import './App.css';

function App() { 
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState("");

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() === "") return; 
        const task = {
            id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
            taskName: newTask,
            completed: false 
        };
        setTodoList([...todoList, task]);
        setNewTask("");  
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTask(); 
        }
    };

    const deleteTask = (id) => {
        setTodoList(todoList.filter((task) => task.id !== id));
    };

    const toggleCompleteTask = (id) => {
        setTodoList(todoList.map((task) => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="App">
          <h1 style={{ marginBottom: '40px' }}>PERSONAL TO-DO LIST</h1>


            <div className="addtask">
                <input 
                    value={newTask}  
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown} 
                    placeholder="Enter a task..."
                />
                <button onClick={addTask}>ADD TASK</button>
            </div>
            <div className="list">
                {todoList.map((task) => (
                    <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
                        <h1>{task.taskName}</h1>
                        <button onClick={() => toggleCompleteTask(task.id)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button className="delete" onClick={() => deleteTask(task.id)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
