import { useState, useEffect } from 'react';
import type { Contact } from '../types/contact';
import { handleApiResponse } from '../utils/api';
import { API_BASE_URL } from '../constants/api';

interface UseContactsReturn {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  addContact: (newContact: FormData) => Promise<void>;
  deleteContact: (contactId: number) => Promise<void>;
  updateContact: (contactId: number, updatedContactData: FormData) => Promise<void>;
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GET: Initial data fetch
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
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

  // POST: Add new contact
  const addContact = async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        body: formData,
      });
      const newContact = await handleApiResponse<Contact>(response);
      setContacts(prevContacts => [...prevContacts, newContact]);
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  // DELETE: Delete a contact
  const deleteContact = async (contactId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
      } else {
        await handleApiResponse(response);
      }
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  // PUT: Update a contact
  const updateContact = async (contactId: number, updatedContactData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        body: updatedContactData,
      });
      const updatedContact = await handleApiResponse<Contact>(response);
      setContacts(prevContacts => prevContacts.map(contact =>
        contact.id === contactId ? updatedContact : contact
      ));
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  return { contacts, loading, error, addContact, deleteContact, updateContact };
}