import { useState } from 'react';
import type { Contact } from '../types/contact';

interface ContactFormProps {
  onContactAdded: (formData: FormData) => Promise<void>;
  isAdding: boolean;
  error: string | null;
}

function ContactForm({ onContactAdded, isAdding, error }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('FullName', fullName);
    formData.append('Address', address);
    formData.append('Phone', phone);
    if (photo) {
      formData.append('Photo', photo);
    }

    await onContactAdded(formData);
    
    setFullName('');
    setAddress('');
    setPhone('');
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-contact-form">
      <h3>Add New Contact</h3>
      {error && <div className="error-message">Error: {error}</div>}
      <div>
        <label htmlFor="add-name">Full Name:</label>
        <input id="add-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="add-address">Address:</label>
        <input id="add-address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="add-phone">Phone:</label>
        <input id="add-phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="add-photo">Photo:</label>
        <input id="add-photo" type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} accept="image/jpeg,image/png" />
      </div>
      <button type="submit" disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add Contact'}
      </button>
    </form>
  );
}

export default ContactForm;