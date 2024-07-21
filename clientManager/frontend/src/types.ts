export interface Client {
  client_id: string;
  name: string;
  date_of_birth: string;
  main_language: string;
  secondary_language: string;
  funding_source: string;
}

export type NewClient = Omit<Client, 'id'>;
