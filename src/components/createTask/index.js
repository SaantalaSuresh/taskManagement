// TaskForm.js
import React, { useState,useEffect } from 'react';
import './index.css';

const TaskForm = ({ onSubmit }) => {
    const tasks =  [{ id: 1, title: 'Complete styling of Todo List', description: 'Style the Todo List using CSS', priority: 'HIGH', status: 'IN PROGRESS', dueDate: '2020-06-05', completed: false },
    { id: 2, title: 'Implement sort functionality', description: 'Implement sorting tasks by priority or due date', priority: 'MEDIUM', status: 'NEW', dueDate: '2020-06-06', completed: false },
    { id: 3, title: 'Get Pedigree For Dog', description: 'Obtain a pedigree for the dog from the veterinarian', priority: 'LOW', status: 'IN PROGRESS', dueDate: '2020-06-05', completed: false },]
    const [tasksList,setTasks] = useState(tasks)
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    priority: 'LOW',
    dueDate: '',
    status:"NEW"
  });
  

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState)
    setTasks((prev)=>[...prev,formState])
    setFormState({
      title: '',
      description: '',
      priority: 'LOW',
      dueDate: ''
    });
   
  };
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
  }, [tasksList]);
 
  

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formState.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Please describe task..."
          value={formState.description}
          onChange={handleInputChange}
        />
        <select name="priority" value={formState.priority} onChange={handleInputChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="status" value={formState.status || 'IN PROGRESS'} onChange={handleInputChange}>
  <option value="NEW">New</option>
  <option value="IN PROGRESS">In Progress</option>
  <option value="COMPLETED">Completed</option>
</select>

        <input
          type="date"
          name="dueDate"
          value={formState.dueDate}
          onChange={handleInputChange}
          required
        />
        <div className="buttons">
          <button type="button" className="cancel-button">CANCEL</button>
          <button type="submit" className="create-button">CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
