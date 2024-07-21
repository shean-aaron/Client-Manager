import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddClientWizard from './components/AddClientWizard';
import ClientList from './components/ClientList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Client Manager</h1>
      </header>
      <main>
        <AddClientWizard />
        <ClientList />
      </main>
    </div>
  );
}

export default App;
