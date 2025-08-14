#enums.py

from enum import Enum

class Status(Enum):
    TODO = "ToDo"
    IN_PROGRESS = "InProgress"
    DONE = "Done"

class Priority(Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class Role(Enum):
    MEMBER = "Member"
    ADMIN = "Admin"
