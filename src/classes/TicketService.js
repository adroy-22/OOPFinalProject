import Ticket from './Ticket';
import { Status, Priority } from './Enums';

class TicketService {
  constructor(ticketRepository) {
    this._ticketRepository = ticketRepository;
  }

  createTicket(title, description, priority = Priority.Medium, createdBy = null, assignedTo = null) {
    const ticket = new Ticket(
      null,
      title,
      description,
      Status.ToDo,
      priority,
      true
    );

    if (createdBy) {
      ticket.createdBy = createdBy;
    }
    if (assignedTo) {
      ticket.assignedTo = assignedTo;
    }

    return this._ticketRepository.save(ticket);
  }

  getAllTickets() {
    return this._ticketRepository.findAll();
  }

  updateTicket(ticketId, updates) {
    const ticket = this._ticketRepository.findById(ticketId);
    if (!ticket) {
      throw new Error(`Ticket with ID ${ticketId} not found`);
    }

    if (updates.title !== undefined) {
      ticket.title = updates.title;
    }
    if (updates.description !== undefined) {
      ticket.description = updates.description;
    }
    if (updates.status !== undefined) {
      ticket.status = updates.status;
    }
    if (updates.priority !== undefined) {
      ticket.priority = updates.priority;
    }
    if (updates.assignedTo !== undefined) {
      ticket.assignedTo = updates.assignedTo;
    }

    return this._ticketRepository.save(ticket);
  }
}

export default TicketService; 