import React from 'react'
import axios from "../axios";

function Todo({ tasks, fetchData }){
  const updateTask = async (id) => {
    try {
      const response = await axios.put(`/updateTask/${id}`, {
        id,
      });
      fetchData();
      return response.data.json;
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`/deleteTask/${id}`, {
        id,
      });
      fetchData();
      return response.data.json;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
        {tasks?.map((task) => (
          <tr id={task._id}>
          <li>
            <h1 className='completed'
              onClick={() => updateTask(task._id,task.completed)}>
              {task.content}
            </h1>
            <p onClick={() => deleteTask(task._id)}>X</p></li>
          </tr>
        ))}
    </div>
  );
}
export default Todo ;