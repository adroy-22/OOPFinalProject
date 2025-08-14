import React, { useState, useEffect } from 'react';
import TicketList from './components/TicketList';
import TicketModal from './components/TicketModal';
import CreateTicketModal from './components/CreateTicketModal';
import EditTicketModal from './components/EditTicketModal';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [nextTicketId, setNextTicketId] = useState(1);

  // Sample data to populate the tickets
  useEffect(() => {
    const sampleTickets = [
      {
        ticket_id: 1,
        title: "Fix login authentication bug",
        description: "Users are unable to log in with valid credentials. The authentication service is returning 500 errors.",
        status: "ToDo",
        priority: "High",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T10:30:00Z",
        is_open: true,
        created_by: { user_id: "user1", name: "John Doe", email: "john@example.com" },
        assigned_to: { user_id: "user2", name: "Jane Smith", email: "jane@example.com" }
      },
      {
        ticket_id: 2,
        title: "Update user profile page",
        description: "The user profile page needs to be redesigned to match the new design system. Include avatar upload functionality.",
        status: "InProgress",
        priority: "Medium",
        created_at: "2024-01-14T14:20:00Z",
        updated_at: "2024-01-15T09:15:00Z",
        is_open: true,
        created_by: { user_id: "user3", name: "Mike Johnson", email: "mike@example.com" },
        assigned_to: { user_id: "user4", name: "Sarah Wilson", email: "sarah@example.com" }
      },
      {
        ticket_id: 3,
        title: "Database performance optimization",
        description: "The database queries are running slowly. Need to optimize indexes and query performance for better response times.",
        status: "ToDo",
        priority: "Critical",
        created_at: "2024-01-13T16:45:00Z",
        updated_at: "2024-01-13T16:45:00Z",
        is_open: true,
        created_by: { user_id: "user1", name: "John Doe", email: "john@example.com" },
        assigned_to: { user_id: "user5", name: "David Brown", email: "david@example.com" }
      },
      {
        ticket_id: 4,
        title: "Add email notifications",
        description: "Implement email notifications for ticket updates, status changes, and new assignments.",
        status: "Done",
        priority: "Low",
        created_at: "2024-01-10T11:00:00Z",
        updated_at: "2024-01-12T15:30:00Z",
        is_open: false,
        created_by: { user_id: "user2", name: "Jane Smith", email: "jane@example.com" },
        assigned_to: { user_id: "user6", name: "Lisa Davis", email: "lisa@example.com" }
      }
    ];
    setTickets(sampleTickets);
    setNextTicketId(sampleTickets.length + 1);
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      ticket_id: nextTicketId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_open: true
    };
    
    setTickets([...tickets, newTicket]);
    setNextTicketId(nextTicketId + 1);
    setShowCreateModal(false);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCloseEditModal = () => {
    setEditingTicket(null);
  };

  const handleSaveTicket = (updatedTicket) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.ticket_id === updatedTicket.ticket_id ? updatedTicket : ticket
      )
    );
    setEditingTicket(null);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <h1>🎫 Ticketing System</h1>
          <p>Manage and track your project tickets efficiently</p>
        </div>
      </div>

      <div className="container">
        <TicketList 
          tickets={tickets} 
          onTicketClick={handleTicketClick}
          onCreateTicket={() => setShowCreateModal(true)}
          onEditTicket={handleEditTicket}
        />

        {selectedTicket && (
          <TicketModal 
            ticket={selectedTicket} 
            onClose={handleCloseModal} 
          />
        )}

        {showCreateModal && (
          <CreateTicketModal 
            onClose={handleCloseCreateModal}
            onCreateTicket={handleCreateTicket}
          />
        )}

        {editingTicket && (
          <EditTicketModal 
            ticket={editingTicket}
            onClose={handleCloseEditModal}
            onSaveTicket={handleSaveTicket}
          />
        )}
      </div>
    </div>
  );
}

export default App; 