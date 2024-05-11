import React, {useState,useEffect} from "react"



function TodoList() {

    const [tasks, setTasks] = useState(() => {const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : ["Eat Breakfast", "Take a Shower", "Jogging"]});
    const [newTask, setnewtask] = useState([]);

    useEffect(() => {
        // Save tasks to localStorage whenever it changes
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);

    function handleInputChange(e) {
        setnewtask(e.target.value)
    }

    function addTask () {

        if(newTask.trim() !== ""){
        setTasks(t => [...tasks, newTask]);
        setnewtask("");
        }
    }

    function deleteTask (index)  {

        const updatedtasks = tasks.filter(( _, i) => i !== index)
        setTasks(updatedtasks);
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index-1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown (index) {
        if(index < tasks.length-1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index+1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }


    return(
        <div className="todolist">
            <h1>To-Do-List</h1>

            <div>
                <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange}/>
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => 
                <li key="index">
                    <span className="text">{task}</span>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="Move-Button" onClick={() => moveTaskUp(index)}>👆</button>
                    <button className="Move-Button" onClick={() => moveTaskDown(index)}>👇</button>
                </li> )}
            </ol>
        </div>);
}

export default TodoList