import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskFilter from './components/TaskFilter'
import TaskList from './components/TaskList'
import './index.css'

function App() {
  // Load from LocalStorage or use default
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      if (saved) return JSON.parse(saved)
    } catch (error) {
      console.error('Failed to parse tasks from local storage:', error)
    }
    return [
      { id: '1', text: 'Master React 19', completed: false },
      { id: '2', text: 'Complete Final Project', completed: false },
      { id: '3', text: 'Buy Grocery', completed: true },
    ]
  })

  // Save to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [filter, setFilter] = useState('all')

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(), // Unique ID requirement
      text,
      completed: false
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const activeCount = tasks.filter(task => !task.completed).length

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskInput onAddTask={addTask} />

      <div className="status-bar">
        <span>{activeCount} items left</span>
        <button className="clear-btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <TaskFilter currentFilter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  )
}

export default App
