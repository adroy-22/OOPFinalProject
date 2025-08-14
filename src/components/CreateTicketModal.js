import React, { useState } from 'react';

const CreateTicketModal = ({ onClose, onCreateTicket }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ToDo',
    priority: 'Medium',
    created_by: {
      user_id: '',
      name: '',
      email: ''
    },
    assigned_to: {
      user_id: '',
      name: '',
      email: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
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
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
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
    
    if (!formData.created_by.name.trim()) {
      newErrors['created_by.name'] = 'Creator name is required';
    }
    
    if (!formData.created_by.email.trim()) {
      newErrors['created_by.email'] = 'Creator email is required';
    } else if (!formData.created_by.email.includes('@')) {
      newErrors['created_by.email'] = 'Invalid email format';
    }
    
    if (formData.assigned_to.name.trim() && !formData.assigned_to.email.trim()) {
      newErrors['assigned_to.email'] = 'Assignee email is required when name is provided';
    }
    
    if (formData.assigned_to.email.trim() && !formData.assigned_to.email.includes('@')) {
      newErrors['assigned_to.email'] = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate user IDs if not provided
      const ticketData = {
        ...formData,
        created_by: {
          ...formData.created_by,
          user_id: formData.created_by.user_id || `user_${Date.now()}_1`
        },
        assigned_to: formData.assigned_to.name.trim() ? {
          ...formData.assigned_to,
          user_id: formData.assigned_to.user_id || `user_${Date.now()}_2`
        } : null
      };
      
      onCreateTicket(ticketData);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Ticket</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter ticket title"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter ticket description"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="ToDo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          
          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '1rem', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Created By *</h3>
            
            <div className="form-group">
              <label htmlFor="creator-name">Name *</label>
              <input
                type="text"
                id="creator-name"
                value={formData.created_by.name}
                onChange={(e) => handleInputChange('created_by.name', e.target.value)}
                placeholder="Enter creator name"
                className={errors['created_by.name'] ? 'error' : ''}
              />
              {errors['created_by.name'] && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors['created_by.name']}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="creator-email">Email *</label>
              <input
                type="email"
                id="creator-email"
                value={formData.created_by.email}
                onChange={(e) => handleInputChange('created_by.email', e.target.value)}
                placeholder="Enter creator email"
                className={errors['created_by.email'] ? 'error' : ''}
              />
              {errors['created_by.email'] && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors['created_by.email']}</span>}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '1rem', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Assigned To (Optional)</h3>
            
            <div className="form-group">
              <label htmlFor="assignee-name">Name</label>
              <input
                type="text"
                id="assignee-name"
                value={formData.assigned_to.name}
                onChange={(e) => handleInputChange('assigned_to.name', e.target.value)}
                placeholder="Enter assignee name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="assignee-email">Email</label>
              <input
                type="email"
                id="assignee-email"
                value={formData.assigned_to.email}
                onChange={(e) => handleInputChange('assigned_to.email', e.target.value)}
                placeholder="Enter assignee email"
                className={errors['assigned_to.email'] ? 'error' : ''}
              />
              {errors['assigned_to.email'] && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors['assigned_to.email']}</span>}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal; 