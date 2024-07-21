import React, { useState } from 'react';
import './App.css';
import AddClientWizard from './components/AddClientWizard';
import ClientList from './components/ClientList';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import logo from './assets/logo.png'; // Ensure your logo is in the correct path

function App() {
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClientAdded = () => {
    setRefresh(!refresh);
  };

  const closeModal = () => setOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <h1>CLIENT MANAGER</h1>
      </header>
      <div className="client-list-container">
        <div className="client-list-header">
          <h2>Clients</h2>
          <div className="add-client-button-container">
            <button className="add-client-button" onClick={() => setOpen(true)}>Add Client</button>
          </div>
        </div>
        <ClientList key={refresh ? 'refresh' : 'static'} />
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal nested>
        <div className="modal">
          <AddClientWizard onClientAdded={handleClientAdded} onClose={closeModal} />
        </div>
      </Popup>
    </div>
  );
}

export default App;