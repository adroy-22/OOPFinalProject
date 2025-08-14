import React, { useState } from 'react';
import { Status, Priority } from '../classes/Enums';
import User from '../classes/User';

const CreateTicketModal = ({ onClose, onCreateTicket }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: Priority.Medium,
    status: Status.ToDo,
    createdBy: {
      name: '',
      email: ''
    },
    assignedTo: {
      name: '',
      email: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.createdBy.name.trim()) {
      newErrors['createdBy.name'] = 'Creator name is required';
    }

    if (!formData.createdBy.email.trim()) {
      newErrors['createdBy.email'] = 'Creator email is required';
    } else if (!formData.createdBy.email.includes('@')) {
      newErrors['createdBy.email'] = 'Invalid email format';
    }

    if (formData.assignedTo.name.trim() && !formData.assignedTo.email.trim()) {
      newErrors['assignedTo.email'] = 'Assignee email is required when name is provided';
    }

    if (formData.assignedTo.email.trim() && !formData.assignedTo.email.includes('@')) {
      newErrors['assignedTo.email'] = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const createdByUser = new User(
        `user_${Date.now()}_1`,
        formData.createdBy.name,
        formData.createdBy.email
      );

      let assignedToUser = null;
      if (formData.assignedTo.name.trim() && formData.assignedTo.email.trim()) {
        assignedToUser = new User(
          `user_${Date.now()}_2`,
          formData.assignedTo.name,
          formData.assignedTo.email
        );
      }

      const ticketData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        createdBy: createdByUser,
        assignedTo: assignedToUser
      };

      onCreateTicket(ticketData);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Ticket</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? 'error' : ''}
              placeholder="Enter ticket title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter ticket description"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              {Object.values(Priority).map(priority => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              {Object.values(Status).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '1rem', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Created By *</h3>
            
            <div className="form-group">
              <label htmlFor="creator-name">Name *</label>
              <input
                type="text"
                id="creator-name"
                name="createdBy.name"
                value={formData.createdBy.name}
                onChange={handleInputChange}
                placeholder="Enter creator name"
                className={errors['createdBy.name'] ? 'error' : ''}
              />
              {errors['createdBy.name'] && <span className="error-message">{errors['createdBy.name']}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="creator-email">Email *</label>
              <input
                type="email"
                id="creator-email"
                name="createdBy.email"
                value={formData.createdBy.email}
                onChange={handleInputChange}
                placeholder="Enter creator email"
                className={errors['createdBy.email'] ? 'error' : ''}
              />
              {errors['createdBy.email'] && <span className="error-message">{errors['createdBy.email']}</span>}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '1rem', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Assigned To (Optional)</h3>
            
            <div className="form-group">
              <label htmlFor="assignee-name">Name</label>
              <input
                type="text"
                id="assignee-name"
                name="assignedTo.name"
                value={formData.assignedTo.name}
                onChange={handleInputChange}
                placeholder="Enter assignee name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="assignee-email">Email</label>
              <input
                type="email"
                id="assignee-email"
                name="assignedTo.email"
                value={formData.assignedTo.email}
                onChange={handleInputChange}
                placeholder="Enter assignee email"
                className={errors['assignedTo.email'] ? 'error' : ''}
              />
              {errors['assignedTo.email'] && <span className="error-message">{errors['assignedTo.email']}</span>}
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal; 