import React from 'react';

const TicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low': return 'priority-low';
      case 'Medium': return 'priority-medium';
      case 'High': return 'priority-high';
      case 'Critical': return 'priority-critical';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ToDo': return 'status-todo';
      case 'InProgress': return 'status-inprogress';
      case 'Done': return 'status-done';
      default: return 'status-todo';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{ticket.title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="ticket-details">
            <div className="detail-row">
              <label>Description:</label>
              <p>{ticket.description}</p>
            </div>
            
            <div className="detail-row">
              <label>Status:</label>
              <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            
            <div className="detail-row">
              <label>Priority:</label>
              <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
            
            <div className="detail-row">
              <label>Created:</label>
              <span>{formatDate(ticket.created_at)}</span>
            </div>
            
            <div className="detail-row">
              <label>Last Updated:</label>
              <span>{formatDate(ticket.updated_at)}</span>
            </div>
            
            <div className="detail-row">
              <label>Created By:</label>
              <span>{ticket.created_by ? ticket.created_by.name : 'Unknown'}</span>
            </div>
            
            <div className="detail-row">
              <label>Assigned To:</label>
              <span>{ticket.assigned_to ? ticket.assigned_to.name : 'Unassigned'}</span>
            </div>
            
            <div className="detail-row">
              <label>Open:</label>
              <span>{ticket.is_open ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal; 