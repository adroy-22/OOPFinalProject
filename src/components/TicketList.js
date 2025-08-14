import React from 'react';

const TicketList = ({ tickets, onTicketClick, onCreateTicket, onEditTicket }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low': return 'priority-low';
      case 'Medium': return 'priority-medium';
      case 'High': return 'priority-high';
      case 'Critical': return 'priority-critical';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = (e, ticket) => {
    e.stopPropagation();
    onEditTicket(ticket);
  };

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>Tickets</h2>
        <button className="btn btn-primary" onClick={onCreateTicket}>
          + Create Ticket
        </button>
      </div>
      
      {tickets.length === 0 ? (
        <div className="no-tickets">
          <p>No tickets found. Create your first ticket!</p>
        </div>
      ) : (
        <div className="tickets-container">
          {tickets.map(ticket => (
            <div
              key={ticket.ticket_id}
              className="ticket-row"
              onClick={() => onTicketClick(ticket)}
            >
              <div className="ticket-info">
                <h3 className="ticket-title">{ticket.title}</h3>
                <p className="ticket-assigned">
                  Assigned to: {ticket.assigned_to ? ticket.assigned_to.name : 'Unassigned'}
                </p>
                <p className="ticket-date">
                  Created: {formatDate(ticket.created_at)}
                </p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList; 