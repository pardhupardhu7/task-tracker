import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className="alert alert-info">No tasks found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
