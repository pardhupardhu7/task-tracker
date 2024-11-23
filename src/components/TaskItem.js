function TaskItem({ task, onEdit, onDelete }) {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Pending': return 'badge bg-warning';
        case 'In Progress': return 'badge bg-info';
        case 'Completed': return 'badge bg-success';
        default: return 'badge bg-secondary';
      }
    };
  
    return (
      <tr>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.dueDate}</td>
      <td>
        <span className={getStatusColor(task.status)}>
          {task.status}
        </span>
      </td>
      <td>
        <div className="btn-group" role="group">
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskItem;

  