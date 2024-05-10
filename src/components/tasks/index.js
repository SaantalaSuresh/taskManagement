// ToDoList.js
import React, { useState,useEffect } from 'react';
import './index.css';


const Tasks = () => {
    
    
  // Sample tasks data
  const [tasks, setTasks] = useState([])

  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = !task.completed ? 'COMPLETED' : 'IN PROGRESS';
        return { ...task, completed: !task.completed, status: newStatus };
      }
      return task;
    }));
  };

  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Function to handle task deletion
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to toggle showing completed tasks
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Function to filter tasks based on search query
  const filteredTasks = tasks.filter(task => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to sort tasks by priority
  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.priority === b.priority) {
        return 0;
      } else if (a.priority === 'HIGH') {
        return -1;
      } else if (b.priority === 'HIGH') {
        return 1;
      } else if (a.priority === 'MEDIUM') {
        return -1;
      } else if (b.priority === 'MEDIUM') {
        return 1;
      } else {
        return 0;
      }
    });
    setTasks(sortedTasks);
  };

  // Function to sort tasks by due date
  const sortByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="todo-list">
     <div className='heading-container'>
     <h2>Tasks</h2>
      <div>
  <input 
    type="text" 
    placeholder="Search tasks..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)} 
    className="search-box"
  />
</div>
     </div>
<span>Priority <button onClick={sortByPriority} className="sort-btn">Sort</button></span>
<span>Due Date <button onClick={sortByDueDate} className="sort-btn desc">Sort</button></span>
      <div className="todo-heading">
        <span>Title</span>
        <span>Description</span>
        <span>Priority <button onClick={sortByPriority}>Sort</button></span>
        <span>Due Date <button onClick={sortByDueDate}>Sort</button></span>
        <span>Completion Status</span>
       
      </div>
      {filteredTasks.map(task => (showCompleted || !task.completed) && (
        <div key={task.id} className={`task ${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(task.id)} />
          <span className="title">{task.title}</span>
          <span className="description">{task.description}</span>
          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span className="due-date">{task.dueDate}</span>
          <span className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
          <div>
            <button className="edit-btn">✏️</button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
          </div>
        </div>
      ))}
      <div>
        <label>
          <input type="checkbox" checked={showCompleted} onChange={toggleShowCompleted} />
          Show completed tasks
        </label>
      </div>
    </div>
  );
};

export default Tasks;
