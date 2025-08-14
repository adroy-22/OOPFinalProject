# Ticketing System - JavaScript OOP Implementation

A comprehensive ticketing system built entirely in **JavaScript**. We built an application that allows users of an organization to keep track of tickets that come up when developing a software application. As small bugs or feature additions crop up, it is important to keep track of them in a centralized place, rank them by priority, and finally assign them to team members to ensure all bases are covered. The impact of this is it’ll help smaller-more agile teams ship faster and ensure code-quality. 


## 📁 **Project Structure**

```
OOPFinalProject/
├── src/                      # React source code with OOP classes
│   ├── classes/             # JavaScript OOP classes
│   │   ├── User.js          # User entity class
│   │   ├── Enums.js         # Status & Priority enums
│   │   ├── Ticket.js        # Core Ticket entity class
│   │   ├── TicketRepository.js # Data persistence layer
│   │   └── TicketService.js # Business logic service layer
│   ├── components/          # React UI components
│   │   ├── TicketList.js    # Ticket list component
│   │   ├── TicketModal.js   # Ticket detail modal
│   │   ├── CreateTicketModal.js # Create ticket form
│   │   └── EditTicketModal.js   # Edit ticket form
│   ├── App.js               # Main app with OOP integration
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/                   # React public files
├── package.json              # React dependencies
└── README.md
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 14+
- npm or yarn

### **Installation & Running**

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Application**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

