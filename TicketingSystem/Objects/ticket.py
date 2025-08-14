from datetime import datetime
from typing import Optional

from .enums import Status, Priority
from .user import User

class Ticket:
  def __init__(
    self,
    ticketId: int,
    title: str,
    description: str,
    status: Status,
    priority: Priority,
    isOpen: bool = true
  ):
    
    self.ticket_id = ticket_id
    self.title = title
    self.description = description
    self.status = status
    self.priority = priority
    self.created_at = datetime.now()
    self.updated_at = datetime.now()
    self.is_open = is_open
    self.created_by: Optional[User] = None
    self.assigned_to: Optional[User] = None

    self._validate()

  def _validate(self):
    if not self.title:
      raise ValueError("Title cannot be empty")
    if not self.description:
      raise ValueError("Description cannot be empty")
    if not self.org_id:
      raise ValueError("Organization ID cannot be empty")

  def to_dict(self):
    return {
    "ticket_id": self.ticket_id,
    "title": self.title,
    "description": self.description,
    "status": self.status.value,
    "priority": self.priority.value,
    "created_at": self.created_at.isoformat(),
    "updated_at": self.updated_at.isoformat(),
    "is_open": self.is_open,
    "assigned_to": self.assigned_to
    }
    
