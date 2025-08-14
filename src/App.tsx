import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { useContacts } from './hooks/useContacts';

function App() {
  const [addFormError, setAddFormError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Новое состояние для управления отображением формы добавления
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  const { contacts, loading, error, addContact, deleteContact, updateContact } = useContacts();
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setSelectedContactId(null); // Сбрасываем выбранный контакт
  };

  const handleAddContact = async (formData: FormData) => {
    setIsAdding(true);
    setAddFormError(null);
    try {
      await addContact(formData);
      setShowAddForm(false); // Скрываем форму после успешного добавления
    } catch (e: any) {
      setAddFormError(e.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateContact = async (contactId: number, updatedData: FormData) => {
    await updateContact(contactId, updatedData);
  };

  const handleDeleteContact = async (contactId: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(contactId);
      setSelectedContactId(null);
    }
  };
  
  const handleSelectContact = (id: number) => {
    setSelectedContactId(id);
    setShowAddForm(false); // Скрываем форму добавления при выборе контакта
  };

  return (
    <div className="container">
      <h1 className="main-title">Personal Address Book</h1>
      {error && <div className="error-message">Fatal Error: {error}</div>}

      <div className="main-layout">
        <div className="top-row">
          <div className="add-contact-panel">
            <button className="toggle-form-button" onClick={handleToggleAddForm}>
              {showAddForm ? 'Hide Form' : 'Add New Contact'}
            </button>
            {showAddForm && (
              <ContactForm
                onContactAdded={handleAddContact}
                isAdding={isAdding}
                error={addFormError}
              />
            )}
          </div>
          <div className="detail-panel">
            {selectedContact && (
              <ContactDetail
                contact={selectedContact}
                onEdit={handleUpdateContact}
                onDelete={handleDeleteContact}
              />
            )}
          </div>
        </div>
        <div className="bottom-row">
          {loading ? (
            <div>Loading contacts...</div>
          ) : (
            <ContactList
              contacts={contacts}
              onContactSelect={handleSelectContact} // Используем новую функцию
              selectedContactId={selectedContactId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;