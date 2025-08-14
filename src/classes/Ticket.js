import { Status, Priority } from './Enums';
import User from './User';

class Ticket {
  constructor(ticketId, title, description, status, priority, isOpen = true) {
    this._ticketId = ticketId;
    this._title = title;
    this._description = description;
    this._status = status;
    this._priority = priority;
    this._isOpen = isOpen;
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._createdBy = null;
    this._assignedTo = null;
  }

  get ticketId() {
    return this._ticketId;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
    this._updateTimestamp();
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription;
    this._updateTimestamp();
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    this._updateTimestamp();
  }

  get priority() {
    return this._priority;
  }

  set priority(newPriority) {
    this._priority = newPriority;
    this._updateTimestamp();
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newIsOpen) {
    this._isOpen = newIsOpen;
    this._updateTimestamp();
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get createdBy() {
    return this._createdBy;
  }

  set createdBy(user) {
    this._createdBy = user;
    this._updateTimestamp();
  }

  get assignedTo() {
    return this._assignedTo;
  }

  set assignedTo(user) {
    this._assignedTo = user;
    this._updateTimestamp();
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    return this;
  }

  close() {
    this.isOpen = false;
    this.status = Status.Done;
    return this;
  }

  open() {
    this.isOpen = true;
    if (this.status === Status.Done) {
      this.status = Status.ToDo;
    }
    return this;
  }

  isOverdue() {
    if (!this.isOpen) return false;
    const now = new Date();
    const daysSinceCreation = Math.floor((now - this.createdAt) / (1000 * 60 * 60 * 24));
    return daysSinceCreation > 7;
  }

  getAgeInDays() {
    const now = new Date();
    return Math.floor((now - this.createdAt) / (1000 * 60 * 60 * 24));
  }

  _updateTimestamp() {
    this._updatedAt = new Date();
  }

  toDict() {
    return {
      ticket_id: this.ticketId,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      is_open: this.isOpen,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      created_by: this.createdBy ? this.createdBy.toDict() : null,
      assigned_to: this.assignedTo ? this.assignedTo.toDict() : null
    };
  }

  static fromDict(data) {
    const ticket = new Ticket(
      data.ticket_id,
      data.title,
      data.description,
      data.status,
      data.priority,
      data.is_open
    );

    if (data.created_at) {
      ticket._createdAt = new Date(data.created_at);
    }
    if (data.updated_at) {
      ticket._updatedAt = new Date(data.updated_at);
    }
    if (data.created_by) {
      ticket.createdBy = User.fromDict(data.created_by);
    }
    if (data.assigned_to) {
      ticket.assignedTo = User.fromDict(data.assigned_to);
    }

    return ticket;
  }
}

export default Ticket; 