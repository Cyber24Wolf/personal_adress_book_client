import { useEffect, useState } from 'react';
import { handleApiResponse   } from './utils/api';

interface Contact {
  id: number;
  fullName: string;
  address: string;
  phone: string;
  photoUrl?: string;
  createdAt: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('http://localhost:5109/api/contacts');
        const data = await handleApiResponse<Contact[]>(response);
        setContacts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Personal Address Book</h1>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <p className="contact-name">{contact.fullName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;