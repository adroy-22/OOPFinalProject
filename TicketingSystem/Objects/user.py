from typing import List

class User:
    def __init__(self, user_id: str, name: str, email: str):
      self.user_id = user_id
      self.name = name
      self.email = email

      self._validate_email();
      
    def _validate_email(self):
      if "@" not in self.email:
        raise ValueError("Invalid email format")
    
    def to_dict(self):
      return {
        "user_id": self.user_id,
        "name": self.name,
        "email": self.email,
      }
