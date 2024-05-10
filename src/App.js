import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';


import TaskForm from './components/createTask'
import Tasks from "./components/tasks"
import Header from './components/Header'



const App = () => {
  return (
   <BrowserRouter>
 
    <Header/>
    <Routes >
    <Route exact path="/" Component={TaskForm}/>
      <Route exact path="/tasks" Component={Tasks} />
      <Route exact path="/create-task" Component={TaskForm}/>
    </Routes>
 
   
   </BrowserRouter>
  )
}

App.propTypes = {

}

export default App
