import React from 'react';

const TicketModal = ({ ticket, onClose }) => {
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      case 'critical':
        return 'priority-critical';
      default:
        return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'status-todo';
      case 'inprogress':
        return 'status-inprogress';
      case 'done':
        return 'status-done';
      default:
        return 'status-todo';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ticket Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-content">
          <div className="ticket-details">
            <div className="detail-row">
              <div className="detail-label">Ticket ID:</div>
              <div className="detail-value">#{ticket.ticket_id}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Title:</div>
              <div className="detail-value">{ticket.title}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Description:</div>
              <div className="detail-value">{ticket.description}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Status:</div>
              <div className="detail-value">
                <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Priority:</div>
              <div className="detail-value">
                <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Created By:</div>
              <div className="detail-value">
                {ticket.created_by ? (
                  <div>
                    <div>{ticket.created_by.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#adb5bd' }}>
                      {ticket.created_by.email}
                    </div>
                  </div>
                ) : (
                  'Unknown'
                )}
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Assigned To:</div>
              <div className="detail-value">
                {ticket.assigned_to ? (
                  <div>
                    <div>{ticket.assigned_to.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#adb5bd' }}>
                      {ticket.assigned_to.email}
                    </div>
                  </div>
                ) : (
                  'Unassigned'
                )}
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Created At:</div>
              <div className="detail-value">{formatDate(ticket.created_at)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Last Updated:</div>
              <div className="detail-value">{formatDate(ticket.updated_at)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Status:</div>
              <div className="detail-value">
                {ticket.is_open ? (
                  <span style={{ color: '#28a745', fontWeight: '600' }}>Open</span>
                ) : (
                  <span style={{ color: '#dc3545', fontWeight: '600' }}>Closed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal; 