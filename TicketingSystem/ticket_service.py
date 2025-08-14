from typing import Dict, List, Optional, Any
from datetime import datetime
from models.ticket import Ticket
from models.enums import Status, Priority

class TicketService:
  def __init__(self, repository: 'TicketRepository'):
    self.repository = repository
  
  def create_ticket(self, ticket_data: Dict[str, Any]) -> Ticket:
    ticket_id = f"tkt_{datetime.now().strftime('%Y%m%d')}_{self.repository.count() + 1}"
    ticket = Ticket(
      ticket_id=ticket_id,
      title=ticket_data['title'],
      description=ticket_data.get('description', ''),
      status=Status(ticket_data.get('status', Status.TODO)),
      priority=Priority(ticket_data.get('priority', Priority.MEDIUM)),
      assignee_id=ticket_data.get('assignee_id')
    )
    return self.repository.save(ticket)
  
  def get_ticket(self, ticket_id: str) -> Optional[Ticket]:
    return self.repository.find_by_id(ticket_id)
  
  def list_tickets(self, filters: Optional[Dict[str, Any]] = None) -> List[Ticket]:
    return self.repository.find_by_filters(filters)
  
  def update_ticket(self, ticket_id: str, update_data: Dict[str, Any]) -> Optional[Ticket]:
    ticket = self.repository.find_by_id(ticket_id)
    if not ticket:
      return None
      
    if 'status' in update_data:
      ticket.status = Status(update_data['status'])
    if 'priority' in update_data:
      ticket.priority = Priority(update_data['priority'])
    if 'title' in update_data:
      ticket.title = update_data['title']
    if 'description' in update_data:
      ticket.description = update_data['description']
    if 'is_open' in update_data:
      ticket.is_open = update_data['is_open']
    if 'assignee_id' in update_data:
      ticket.assignee_id = update_data['assignee_id']
      
    ticket.updated_at = datetime.now()
    return self.repository.save(ticket)
  
  def change_status(self, ticket_id: str, new_status: Status) -> Optional[Ticket]:
    ticket = self.repository.find_by_id(ticket_id)
    if not ticket:
      return None
      
    ticket.status = new_status
    ticket.updated_at = datetime.now()
    return self.repository.save(ticket)
