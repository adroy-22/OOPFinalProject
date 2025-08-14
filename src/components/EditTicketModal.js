import React, { useState, useEffect } from 'react';

const EditTicketModal = ({ ticket, onClose, onSaveTicket }) => {
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

  // Initialize form data when ticket changes
  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || 'ToDo',
        priority: ticket.priority || 'Medium',
        created_by: {
          user_id: ticket.created_by?.user_id || '',
          name: ticket.created_by?.name || '',
          email: ticket.created_by?.email || ''
        },
        assigned_to: {
          user_id: ticket.assigned_to?.user_id || '',
          name: ticket.assigned_to?.name || '',
          email: ticket.assigned_to?.email || ''
        }
      });
    }
  }, [ticket]);

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
      // Preserve the original ticket ID and timestamps
      const updatedTicket = {
        ...ticket,
        ...formData,
        updated_at: new Date().toISOString()
      };
      
      onSaveTicket(updatedTicket);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!ticket) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Ticket #{ticket.ticket_id}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label htmlFor="edit-title">Title *</label>
            <input
              type="text"
              id="edit-title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter ticket title"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description">Description *</label>
            <textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter ticket description"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="ToDo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-priority">Priority</label>
            <select
              id="edit-priority"
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
              <label htmlFor="edit-creator-name">Name *</label>
              <input
                type="text"
                id="edit-creator-name"
                value={formData.created_by.name}
                onChange={(e) => handleInputChange('created_by.name', e.target.value)}
                placeholder="Enter creator name"
                className={errors['created_by.name'] ? 'error' : ''}
              />
              {errors['created_by.name'] && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{errors['created_by.name']}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-creator-email">Email *</label>
              <input
                type="email"
                id="edit-creator-email"
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
              <label htmlFor="edit-assignee-name">Name</label>
              <input
                type="text"
                id="edit-assignee-name"
                value={formData.assigned_to.name}
                onChange={(e) => handleInputChange('assigned_to.name', e.target.value)}
                placeholder="Enter assignee name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-assignee-email">Email</label>
              <input
                type="email"
                id="edit-assignee-email"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicketModal; 