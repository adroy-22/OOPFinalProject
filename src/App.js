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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketRepository, setTicketRepository] = useState(null);
  const [ticketService, setTicketService] = useState(null);
  const [initializationError, setInitializationError] = useState(null);
  const [useOOP, setUseOOP] = useState(false);

  useEffect(() => {
    const initializeOOP = async () => {
      try {
        console.log('Initializing OOP components...');
        
        const { default: TicketRepository } = await import('./classes/TicketRepository');
        const { default: TicketService } = await import('./classes/TicketService');
        
        console.log('Classes imported successfully');
        
        const repository = new TicketRepository();
        const service = new TicketService(repository);
        
        console.log('Repository and Service instantiated');
        
        setTicketRepository(repository);
        setTicketService(service);
        setUseOOP(true);
        setInitializationError(null);
        
        console.log('OOP initialization complete');
      } catch (error) {
        console.error('OOP initialization failed:', error);
        setInitializationError(error.message);
        setUseOOP(false);
      }
    };

    initializeOOP();
  }, []);

  useEffect(() => {
    if (ticketService) {
      loadTickets();
    }
  }, [ticketService]);

  const loadTickets = () => {
    try {
      console.log('Loading tickets...');
      setLoading(true);
      setError(null);
      
      const allTickets = ticketService.getAllTickets();
      const ticketObjects = allTickets.map(ticket => ticket.toDict());
      
      console.log('Tickets loaded:', ticketObjects.length);
      setTickets(ticketObjects);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load tickets:', error);
      setError('Failed to load tickets: ' + error.message);
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket) => {
    console.log('Ticket clicked:', ticket);
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    console.log('Closing ticket modal');
    setSelectedTicket(null);
  };

  const handleCreateTicket = () => {
    console.log('Opening create ticket modal');
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    console.log('Closing create ticket modal');
    setShowCreateModal(false);
  };

  const handleCreateTicketSubmit = (ticketData) => {
    try {
      console.log('Creating ticket with data:', ticketData);
      
      const newTicket = ticketService.createTicket(
        ticketData.title,
        ticketData.description,
        ticketData.priority,
        ticketData.createdBy,
        ticketData.assignedTo
      );
      
      console.log('Ticket created:', newTicket);
      loadTickets();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create ticket:', error);
      alert('Failed to create ticket: ' + error.message);
    }
  };

  const handleEditTicket = (ticket) => {
    console.log('Opening edit modal for ticket:', ticket);
    setEditingTicket(ticket);
  };

  const handleCloseEditModal = () => {
    console.log('Closing edit modal');
    setEditingTicket(null);
  };

  const handleSaveTicket = (ticketId, updates) => {
    try {
      console.log('Saving ticket updates:', { ticketId, updates });
      
      const updatedTicket = ticketService.updateTicket(ticketId, updates);
      console.log('Ticket updated:', updatedTicket);
      
      loadTickets();
      setEditingTicket(null);
    } catch (error) {
      console.error('Failed to update ticket:', error);
      alert('Failed to update ticket: ' + error.message);
    }
  };

  if (initializationError) {
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1>🎫 Ticketing System</h1>
            <p>Initialization Error</p>
          </div>
        </div>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>❌ OOP Initialization Failed</h2>
            <p style={{ color: '#dc3545', marginTop: '1rem' }}>
              Error: {initializationError}
            </p>
            <button className="btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!ticketService) {
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1>🎫 Ticketing System</h1>
            <p>Loading OOP Components...</p>
          </div>
        </div>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>⏳ Initializing...</h2>
            <p>Setting up Object-Oriented Programming components...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1>🎫 Ticketing System</h1>
            <p>Loading Tickets...</p>
          </div>
        </div>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>⏳ Loading...</h2>
            <p>Fetching tickets from the system...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1>🎫 Ticketing System</h1>
            <p>Error Loading Tickets</p>
          </div>
        </div>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>❌ Error</h2>
            <p style={{ color: '#dc3545', marginTop: '1rem' }}>
              {error}
            </p>
            <button className="btn" onClick={loadTickets}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <h1>🎫 Ticketing System</h1>
          <p>Object-Oriented Programming Demo</p>
        </div>
      </div>
      
      <div className="container">
        <TicketList
          tickets={tickets}
          onTicketClick={handleTicketClick}
          onCreateTicket={handleCreateTicket}
          onEditTicket={handleEditTicket}
        />
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
        />
      )}

      {showCreateModal && (
        <CreateTicketModal
          onClose={handleCloseCreateModal}
          onCreateTicket={handleCreateTicketSubmit}
        />
      )}

      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={handleCloseEditModal}
          onSave={handleSaveTicket}
        />
      )}
    </div>
  );
}

export default App; 