# Ticketing System

A comprehensive ticketing system built with Python backend and React frontend.

## Project Structure

```
OOPFinalProject/
├── TicketingSystem/          # Python backend
│   ├── main.py
│   ├── Objects/
│   │   ├── __init__.py
│   │   ├── enums.py
│   │   ├── ticket.py
│   │   └── user.py
│   ├── ticket_repository.py
│   └── ticket_service.py
├── public/                   # React public files
│   └── index.html
├── src/                      # React source code
│   ├── components/
│   │   ├── TicketList.js
│   │   ├── TicketModal.js
│   │   └── CreateTicketModal.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Features

### Backend (Python)
- **Ticket Management**: Create, read, update tickets with full CRUD operations
- **User Management**: Handle user creation and assignment
- **Status & Priority**: Support for different ticket statuses and priority levels
- **Validation**: Comprehensive input validation for all fields

### Frontend (React)
- **Ticket List View**: Display all tickets with title, assigned user, and priority
- **Detailed Modal**: Click any ticket to view complete details
- **Create Ticket Form**: Add new tickets with all required fields
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Form Validation**: Client-side validation with error messages

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Running the Frontend

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Frontend Components

### TicketList
- Displays tickets in a clean list format
- Shows title, assigned user, and priority
- Includes create ticket button
- Responsive grid layout

### TicketModal
- Detailed view of selected ticket
- Shows all ticket properties
- Color-coded priority and status badges
- User information display

### CreateTicketModal
- Form for creating new tickets
- All required fields with validation
- User creation for creator and assignee
- Dropdown selections for status and priority

## Data Structure

### Ticket Object
```javascript
{
  ticket_id: number,
  title: string,
  description: string,
  status: "ToDo" | "InProgress" | "Done",
  priority: "Low" | "Medium" | "High" | "Critical",
  created_at: string (ISO date),
  updated_at: string (ISO date),
  is_open: boolean,
  created_by: User,
  assigned_to: User | null
}
```

### User Object
```javascript
{
  user_id: string,
  name: string,
  email: string
}
```

## Styling

The frontend uses modern CSS with:
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Smooth transitions and hover effects
- Responsive design principles
- Color-coded priority and status indicators

## Future Enhancements

- Backend API integration
- Real-time updates
- User authentication
- Ticket filtering and search
- File attachments
- Comment system
- Email notifications
