from datetime import datetime
from typing import Optional

from .enums import Status, Priority

class Ticket:
  def __init__(
    self,
    ticketId: str,
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
  
  def update_status(self, new_status: Status):
    self.status = new_status
    self.updated_at = datetime.now()
    
