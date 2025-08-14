import type { Contact } from '../types/contact';

interface ContactListProps {
  contacts: Contact[];
  onContactSelect: (contactId: number) => void;
  selectedContactId: number | null;
}

function ContactList({ contacts, onContactSelect, selectedContactId }: ContactListProps) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <button 
            className={`contact-button ${contact.id === selectedContactId ? 'active' : ''}`}
            onClick={() => onContactSelect(contact.id)}
          >
            {contact.fullName}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;