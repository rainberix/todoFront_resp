import React,{useState,useEffect} from 'react'
import axios from "../axios";
import Todo from "./Todo";


function TodoForm(){
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/getAllTasks");
      setTasks(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    await axios.post("/addTask", [
      {
        ...tasks,
        content: input,
        completed: false,
      },
    ]);
    fetchData();
    setInput("");
  };
  return (
    <div>
      <form className='TodoForm' onSubmit={addTask}>
        <input
          type='text'
          className='todo-input'
          placeholder='add new task'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' className='todo-btn'>
          ADD TASK
        </button>
      </form>
      <Todo tasks={tasks} fetchData={fetchData} />
    </div>
    )
  }
export default TodoForm ;
