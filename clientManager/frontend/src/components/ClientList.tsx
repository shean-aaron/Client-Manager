import React, { useState, useEffect } from 'react';
import { getClients } from '../api';
import { Client } from '../types';
import Pagination from 'react-js-pagination';
import './ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error fetching the clients:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const displayedClients = clients.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <div className="client-list">
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Main Language</th>
            <th>Secondary Language</th>
            <th>Funding Source</th>
          </tr>
        </thead>
        <tbody>
          {displayedClients.map((client) => (
            <tr key={client.client_id}>
              <td>{client.client_id}</td>
              <td>{client.name}</td>
              <td>{new Date(client.date_of_birth).toLocaleDateString()}</td>
              <td>{client.main_language}</td>
              <td>{client.secondary_language}</td>
              <td>{client.funding_source}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={clients.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default ClientList;
