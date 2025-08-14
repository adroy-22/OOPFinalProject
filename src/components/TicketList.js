import React from 'react';

const TicketList = ({ tickets, onTicketClick, onCreateTicket, onEditTicket }) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEditClick = (e, ticket) => {
    e.stopPropagation(); // Prevent opening the detail modal
    onEditTicket(ticket);
  };

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>All Tickets ({tickets.length})</h2>
        <button className="btn" onClick={onCreateTicket}>
          + Create New Ticket
        </button>
      </div>
      
      {tickets.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
          No tickets found. Create your first ticket to get started!
        </div>
      ) : (
        tickets.map((ticket) => (
          <div 
            key={ticket.ticket_id} 
            className="ticket-row"
            onClick={() => onTicketClick(ticket)}
          >
            <div className="ticket-title">
              {ticket.title}
            </div>
            <div className="ticket-assigned">
              {ticket.assigned_to ? ticket.assigned_to.name : 'Unassigned'}
            </div>
            <div className="ticket-actions">
              <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                {ticket.priority}
              </span>
              <button 
                className="btn-edit"
                onClick={(e) => handleEditClick(e, ticket)}
                title="Edit ticket"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList; 