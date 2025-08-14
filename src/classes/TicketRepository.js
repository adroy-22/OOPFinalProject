import Ticket from './Ticket';
import User from './User';
import { Status, Priority } from './Enums';

class TicketRepository {
  constructor() {
    this._tickets = new Map();
    this._nextId = 1;
    this._initializeSampleData();
  }

  save(ticket) {
    if (!ticket.ticketId) {
      ticket._ticketId = this._nextId++;
    }
    this._tickets.set(ticket.ticketId, ticket);
    return ticket;
  }

  findById(id) {
    return this._tickets.get(id) || null;
  }

  findByFilters(filters = {}) {
    let results = Array.from(this._tickets.values());

    if (filters.status) {
      results = results.filter(ticket => ticket.status === filters.status);
    }
    if (filters.priority) {
      results = results.filter(ticket => ticket.priority === filters.priority);
    }
    if (filters.isOpen !== undefined) {
      results = results.filter(ticket => ticket.isOpen === filters.isOpen);
    }
    if (filters.assignedTo) {
      results = results.filter(ticket => 
        ticket.assignedTo && ticket.assignedTo.userId === filters.assignedTo
      );
    }
    if (filters.createdBy) {
      results = results.filter(ticket => 
        ticket.createdBy && ticket.createdBy.userId === filters.createdBy
      );
    }

    return results.sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  findAll() {
    return Array.from(this._tickets.values())
      .sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  deleteById(id) {
    return this._tickets.delete(id);
  }

  count() {
    return this._tickets.size;
  }

  countByStatus(status) {
    return Array.from(this._tickets.values())
      .filter(ticket => ticket.status === status).length;
  }

  countByPriority(priority) {
    return Array.from(this._tickets.values())
      .filter(ticket => ticket.priority === priority).length;
  }

  findByPrioritySorted() {
    return Array.from(this._tickets.values())
      .sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  findOverdueTickets() {
    return Array.from(this._tickets.values())
      .filter(ticket => ticket.isOverdue())
      .sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  findOpenTickets() {
    return Array.from(this._tickets.values())
      .filter(ticket => ticket.isOpen)
      .sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  findClosedTickets() {
    return Array.from(this._tickets.values())
      .filter(ticket => !ticket.isOpen)
      .sort((a, b) => Priority.compare(b.priority, a.priority));
  }

  clear() {
    this._tickets.clear();
    this._nextId = 1;
  }

  exportToJSON() {
    const data = {
      tickets: Array.from(this._tickets.values()).map(ticket => ticket.toDict()),
      nextId: this._nextId
    };
    return JSON.stringify(data, null, 2);
  }

  importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      this.clear();
      
      if (data.nextId) {
        this._nextId = data.nextId;
      }
      
      if (data.tickets && Array.isArray(data.tickets)) {
        data.tickets.forEach(ticketData => {
          const ticket = Ticket.fromDict(ticketData);
          this._tickets.set(ticket.ticketId, ticket);
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import JSON:', error);
      return false;
    }
  }

  _initializeSampleData() {
    const user1 = new User(1, 'John Doe', 'john@example.com');
    const user2 = new User(2, 'Jane Smith', 'jane@example.com');
    const user3 = new User(3, 'Bob Johnson', 'bob@example.com');

    const sampleTickets = [
      new Ticket(1, 'Fix login bug', 'Users cannot log in with correct credentials', Status.ToDo, Priority.High, true),
      new Ticket(2, 'Update documentation', 'API documentation needs to be updated for v2.0', Status.InProgress, Priority.Medium, true),
      new Ticket(3, 'Performance optimization', 'Database queries are running slow', Status.Done, Priority.Critical, false),
      new Ticket(4, 'Add user roles', 'Implement role-based access control', Status.ToDo, Priority.Low, true),
      new Ticket(5, 'Fix email notifications', 'Users not receiving email notifications', Status.InProgress, Priority.High, true)
    ];

    sampleTickets[0].createdBy = user1;
    sampleTickets[0].assignedTo = user2;
    
    sampleTickets[1].createdBy = user2;
    sampleTickets[1].assignedTo = user1;
    
    sampleTickets[2].createdBy = user3;
    sampleTickets[2].assignedTo = user1;
    
    sampleTickets[3].createdBy = user1;
    sampleTickets[3].assignedTo = user3;
    
    sampleTickets[4].createdBy = user2;
    sampleTickets[4].assignedTo = user2;

    sampleTickets.forEach(ticket => {
      this._tickets.set(ticket.ticketId, ticket);
    });

    this._nextId = sampleTickets.length + 1;
  }
}

export default TicketRepository; 