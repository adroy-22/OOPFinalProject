# Ticketing System - JavaScript OOP Implementation

A comprehensive ticketing system built entirely in **JavaScript using Object-Oriented Programming principles**. This system demonstrates advanced OOP concepts including **encapsulation**, **inheritance**, **polymorphism**, **abstraction**, **composition**, and **single responsibility**.

## 🏗️ **Architecture & OOP Principles**

### **Frontend (React + JavaScript Classes)**
- **User Class**: User management with validation and encapsulation
- **Ticket Class**: Core entity with proper encapsulation and validation
- **Status & Priority Enums**: Type safety and polymorphism
- **TicketRepository Class**: Data persistence layer showing encapsulation
- **TicketService Class**: Business logic layer demonstrating delegation and single responsibility
- **React Components**: UI layer with proper separation of concerns

### **OOP Patterns Demonstrated**
- **Encapsulation**: Private properties with getters/setters
- **Inheritance**: Class hierarchies and method overriding
- **Polymorphism**: Enum usage and method overloading
- **Abstraction**: Service layer abstracts business complexity
- **Composition**: Repository pattern with dependency injection
- **Single Responsibility**: Each class has one clear purpose

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

## 🔧 **OOP Implementation Details**

### **1. User Class (Encapsulation & Validation)**
```javascript
class User {
  constructor(userId, name, email) {
    this._userId = userId;        // Private property
    this._name = name;
    this._email = email;
    this._validateEmail();        // Private validation
  }

  get name() { return this._name; }           // Getter
  set name(newName) {                         // Setter with validation
    this._validateName(newName);
    this._name = newName;
  }

  _validateEmail() {                          // Private method
    if (!this._email.includes('@')) {
      throw new Error('Invalid email format');
    }
  }
}
```

### **2. Enums (Immutability & Type Safety)**
```javascript
export const Status = Object.freeze({
  TODO: 'ToDo',
  IN_PROGRESS: 'InProgress',
  DONE: 'Done',

  isValid(value) {                           // Polymorphic behavior
    return this.values().includes(value);
  },

  getNext(currentStatus) {                    // Business logic
    const statusFlow = [this.TODO, this.IN_PROGRESS, this.DONE];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  }
});
```

### **3. Ticket Class (Complex Entity with Validation)**
```javascript
class Ticket {
  constructor(ticketId, title, description, status, priority, isOpen = true) {
    this._ticketId = ticketId;
    this._title = title;
    // ... other properties
    
    this._validate();                        // Private validation
  }

  set title(newTitle) {                      // Setter with validation
    this._validateTitle(newTitle);
    this._title = newTitle;
    this._updateTimestamp();                 // Automatic side effects
  }

  updateStatus(newStatus) {                  // Business method
    this.status = newStatus;                 // Uses setter (encapsulation)
  }

  isOverdue() {                              // Business logic
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this._createdAt < sevenDaysAgo && this._status !== Status.DONE;
  }
}
```

### **4. TicketRepository Class (Data Access Layer)**
```javascript
class TicketRepository {
  constructor() {
    this._tickets = new Map();               // Private storage
    this._nextId = 1;
    this._initializeSampleData();            // Private initialization
  }

  save(ticket) {                             // Single responsibility
    if (!(ticket instanceof Ticket)) {       // Type checking
      throw new Error('Can only save Ticket instances');
    }
    this._tickets.set(ticket.ticketId, ticket);
    return ticket;
  }

  findByFilters(filters = {}) {              // Flexible querying
    let filteredTickets = Array.from(this._tickets.values());
    
    if (filters.status && Status.isValid(filters.status)) {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.status === filters.status
      );
    }
    // ... more filters
    return filteredTickets;
  }
}
```

### **5. TicketService Class (Business Logic Layer)**
```javascript
class TicketService {
  constructor(repository) {                   // Dependency injection
    if (!repository) {
      throw new Error('Repository is required for TicketService');
    }
    this._repository = repository;
  }

  createTicket(ticketData) {                 // Business logic
    this._validateTicketData(ticketData);    // Validation
    
    const createdBy = this._createOrGetUser(ticketData.createdBy);
    const assignedTo = ticketData.assignedTo ? 
      this._createOrGetUser(ticketData.assignedTo) : null;

    const ticket = new Ticket(               // Object instantiation
      null, ticketData.title, ticketData.description,
      ticketData.status || Status.TODO,
      ticketData.priority || Priority.MEDIUM
    );

    ticket.createdBy = createdBy;            // Set relationships
    ticket.assignedTo = assignedTo;

    return this._repository.save(ticket);    // Delegation to repository
  }

  changeStatus(ticketId, newStatus, userId) { // Business rules
    if (!this._canUserChangeStatus(ticket, userId)) {
      throw new Error('User not authorized to change status');
    }
    
    ticket.updateStatus(newStatus);          // Delegation to ticket
    return this._repository.save(ticket);    // Delegation to repository
  }
}
```

## 🌐 **React Integration**

### **App Component (OOP Instantiation)**
```javascript
function App() {
  // Initialize OOP components (OOP principle: instantiation)
  const [ticketRepository] = useState(() => new TicketRepository());
  const [ticketService] = useState(() => new TicketService(ticketRepository));

  const loadTickets = () => {
    // Use the TicketService to get tickets (OOP principle: delegation)
    const ticketsData = ticketService.getTickets();
    
    // Convert Ticket objects to plain objects for React state
    const ticketsForState = ticketsData.map(ticket => ticket.toDict());
    setTickets(ticketsForState);
  };
}
```

## 🎯 **OOP Skills Demonstrated**

### **1. Encapsulation**
- ✅ **Private properties** with underscore prefix
- ✅ **Getters and setters** with validation
- ✅ **Private methods** for internal operations
- ✅ **Data hiding** and controlled access

### **2. Inheritance & Polymorphism**
- ✅ **Enum inheritance** from base Object
- ✅ **Method overriding** and polymorphic behavior
- ✅ **Type checking** with instanceof
- ✅ **Interface-like** behavior with enums

### **3. Abstraction**
- ✅ **Service layer** abstracts business complexity
- ✅ **Repository pattern** abstracts data access
- ✅ **Component architecture** abstracts UI complexity
- ✅ **Method abstraction** for complex operations

### **4. Composition & Dependency Injection**
- ✅ **Repository injected** into Service
- ✅ **Service injected** into React components
- ✅ **Loose coupling** between layers
- ✅ **Testable architecture** design

### **5. Single Responsibility**
- ✅ **User class**: User management only
- ✅ **Ticket class**: Ticket entity only
- ✅ **Repository class**: Data persistence only
- ✅ **Service class**: Business logic only
- ✅ **React components**: UI rendering only

### **6. Advanced OOP Patterns**
- ✅ **Factory methods** (fromDict, clone)
- ✅ **Validation patterns** with error handling
- ✅ **Business rule enforcement**
- ✅ **State management** with proper encapsulation
- ✅ **Error handling** with meaningful messages

## 🔍 **Testing the OOP Integration**

1. **Create Ticket**: 
   React Form → TicketService.createTicket() → Ticket constructor → Repository.save()

2. **Edit Ticket**: 
   React Form → TicketService.updateTicket() → Ticket setters → Repository.save()

3. **List Tickets**: 
   React Component → TicketService.getTickets() → Repository.findByFilters()

4. **Business Rules**: 
   Status changes → Service validation → Ticket methods → Repository persistence

## 📊 **Sample Data Initialization**

The system automatically initializes sample data using OOP principles:
- **User objects** instantiated from `User` class
- **Ticket objects** created through `TicketService.createTicket()`
- **Data persistence** handled by `TicketRepository.save()`
- **Business logic** enforced by `TicketService` validation

## 🎓 **Learning Outcomes**

This project demonstrates:
- **Real-world OOP application** in a modern JavaScript environment
- **Service layer architecture** with proper separation of concerns
- **Repository pattern** for data access abstraction
- **Component-based architecture** with OOP backend
- **Advanced JavaScript features** (classes, modules, encapsulation)
- **Professional code organization** and best practices

## 🚨 **Troubleshooting**

### **Common Issues**
- **Import errors**: Ensure all class files are in the `src/classes/` directory
- **Validation errors**: Check that all required fields are provided
- **Type errors**: Verify that data matches expected class types

### **Debugging**
- **Console logs**: Check browser console for validation errors
- **Class instances**: Verify objects are proper class instances
- **Method calls**: Ensure methods are called on correct objects

## 🌟 **OOP Excellence Showcase**

This system showcases **enterprise-level OOP design** with:
- **Clean architecture** following SOLID principles
- **Professional error handling** and validation
- **Scalable design** that's easy to extend
- **Maintainable code** with clear responsibilities
- **Testable components** with dependency injection
- **Modern JavaScript** best practices

The system demonstrates how OOP principles create **maintainable**, **scalable**, and **well-structured code** that's easy to understand, extend, and maintain in a professional development environment.
