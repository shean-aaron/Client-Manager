import React, { useState } from 'react';
import { createClient } from '../api';

const AddClientWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({
    name: '',
    date_of_birth: '',
    main_language: '',
    secondary_language: '',
    funding_source: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await createClient(clientData);
    alert('Client added successfully!');
    setClientData({
      name: '',
      date_of_birth: '',
      main_language: '',
      secondary_language: '',
      funding_source: '',
    });
    setStep(1);
  };

  return (
    <div>
      <h2>Add New Client</h2>
      {step === 1 && (
        <div>
          <label>
            Name:
            <input type="text" name="name" value={clientData.name} onChange={handleChange} />
          </label>
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>
            Date of Birth:
            <input type="date" name="date_of_birth" value={clientData.date_of_birth} onChange={handleChange} />
          </label>
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <label>
            Main Language:
            <input type="text" name="main_language" value={clientData.main_language} onChange={handleChange} />
          </label>
          <label>
            Secondary Language:
            <input type="text" name="secondary_language" value={clientData.secondary_language} onChange={handleChange} />
          </label>
          <label>
            Funding Source:
            <input type="text" name="funding_source" value={clientData.funding_source} onChange={handleChange} />
          </label>
          <button onClick={handleSubmit}>Add Client</button>
        </div>
      )}
    </div>
  );
};

export default AddClientWizard;
