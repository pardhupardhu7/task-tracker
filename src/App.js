import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, taskWithId]);
  };

  // Update existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Delete task with confirmation
  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Filter tasks
  const [filter, setFilter] = useState('all');
  const filteredTasks = tasks.filter(task => 
    filter === 'all' || task.status === filter
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Tracker</h1>
      
      <div className="row">
        <div className="col-md-4">
          <AddTaskForm 
            addTask={addTask} 
            editingTask={editingTask}
            updateTask={updateTask}
          />
        </div>
        
        <div className="col-md-8">
          <div className="mb-3">
            <label className="me-2">Filter by Status:</label>
            <select 
              className="form-select d-inline w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <TaskList 
            tasks={filteredTasks}
            onEdit={openEditModal}
            onDelete={deleteTask}
          />
        </div>
      </div>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        task={editingTask}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
