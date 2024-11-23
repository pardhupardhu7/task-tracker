import React, { useState, useEffect } from 'react';

function AddTaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      dueDate,
      status
    };

    if (editingTask) {
      updateTask({ ...taskData, id: editingTask.id });
    } else {
      addTask(taskData);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
