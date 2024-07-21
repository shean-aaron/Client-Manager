import React, { useState } from 'react';
import { createClient } from '../api';
import { NewClient } from '../types';
import './AddClientWizard.css';

const AddClientWizard = ({ onClientAdded, onClose }: { onClientAdded: () => void, onClose: () => void }) => {
  const [clientData, setClientData] = useState<NewClient>({
    client_id: '',
    name: '',
    date_of_birth: '',
    main_language: '',
    secondary_language: '',
    funding_source: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(clientData);
      onClientAdded();
      onClose();
      setClientData({
        client_id: '',
        name: '',
        date_of_birth: '',
        main_language: '',
        secondary_language: '',
        funding_source: ''
      });
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to add client');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Client ID</label>
        <input
          type="text"
          name="client_id"
          value={clientData.client_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={clientData.date_of_birth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Main Language</label>
        <input
          type="text"
          name="main_language"
          value={clientData.main_language}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Secondary Language</label>
        <input
          type="text"
          name="secondary_language"
          value={clientData.secondary_language}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Funding Source</label>
        <select
          name="funding_source"
          value={clientData.funding_source}
          onChange={handleChange}
          required
        >
          <option value="">Select funding source</option>
          <option value="NDIS">NDIS</option>
          <option value="HCP">HCP</option>
          <option value="CHSP">CHSP</option>
          <option value="DVA">DVA</option>
          <option value="HACC">HACC</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="add-client-button">Add Client</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AddClientWizard;
