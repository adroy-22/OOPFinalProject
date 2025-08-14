from typing import Dict, List, Optional, Any
from Objects.ticket import Ticket
from Objects.enums import Status, Priority

class TicketRepository:
  def __init__(self):
    self.tickets: Dict[str, Ticket] = {}
    
  def save(self, ticket: Ticket) -> Ticket:
    self.tickets[ticket.ticket_id] = ticket
    return ticket
    
  def find_by_id(self, ticket_id: str) -> Optional[Ticket]:
    return self.tickets.get(ticket_id)

  def find_by_filters(self, filters: Optional[Dict[str, Any]] = None) -> List[Ticket]:
    filtered_tickets = [
      t for t in self.tickets.values() 
    ]
        
    if filters:
      if 'status' in filters:
        status = Status(filters['status']) if isinstance(filters['status'], str) else filters['status']
        filtered_tickets = [t for t in filtered_tickets if t.status == status]
      if 'priority' in filters:
        priority = Priority(filters['priority']) if isinstance(filters['priority'], str) else filters['priority']
        filtered_tickets = [t for t in filtered_tickets if t.priority == priority]
      if 'is_open' in filters:
        filtered_tickets = [t for t in filtered_tickets if t.is_open == filters['is_open']]
        
    return filtered_tickets

  def count(self) -> int:
    return len(self.tickets)
