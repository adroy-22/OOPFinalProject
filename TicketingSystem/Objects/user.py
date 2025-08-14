from typing import List
from .enums import Role

class User:
    def __init__(self, user_id: str, name: str, email: str, role: Role):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.role = role
        self.tickets_created: List["Ticket"] = []
        self.tickets_assigned: List["Ticket"] = []
    def 
