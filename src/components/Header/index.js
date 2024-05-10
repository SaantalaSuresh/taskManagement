// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = ({ onTaskClick, onCreateTaskClick }) => {
  return (
    <header className="header">
      <nav className="navigation">
        <ul className="nav-list">
        <Link to="/create-task">
        <li className="nav-item">
            <button onClick={onCreateTaskClick} className="nav-link">Create Task</button>
          </li>
        </Link>
          <Link to="/tasks">
          <li className="nav-item">
            <button onClick={onTaskClick} className="nav-link">Tasks</button>
          </li>
          </Link>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
