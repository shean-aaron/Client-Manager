import React, { useEffect, useState } from 'react';
import { getClients } from '../api';

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getClients();
      setClients(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
