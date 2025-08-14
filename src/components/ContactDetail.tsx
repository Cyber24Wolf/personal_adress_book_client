import { useState } from 'react';
import type { Contact } from '../types/contact';

interface ContactDetailProps {
  contact: Contact;
  onEdit: (id: number, formData: FormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

function ContactDetail({ contact, onEdit, onDelete }: ContactDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(contact.fullName);
  const [address, setAddress] = useState(contact.address);
  const [phone, setPhone] = useState(contact.phone);
  const [photo, setPhoto] = useState<File | null>(null);

  const defaultPhotoUrl = '/images/default-profile.png';

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FullName', fullName);
    formData.append('Address', address);
    formData.append('Phone', phone);
    if (photo) {
      formData.append('Photo', photo);
    }
    await onEdit(contact.id, formData);
    setIsEditing(false); // Close edit form on success
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEditSubmit} className="edit-contact-form">
        <h3>Edit Contact</h3>
        <div>
          <label htmlFor="edit-name">Full Name:</label>
          <input id="edit-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="edit-address">Address:</label>
          <input id="edit-address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="edit-phone">Phone:</label>
          <input id="edit-phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="edit-photo">Photo:</label>
          <input id="edit-photo" type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} accept="image/jpeg,image/png" />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    );
  }

  return (
    <div className="contact-detail-card">
      <div className="detail-header">
        <img
          src={contact.photoUrl ? `http://localhost:5000${contact.photoUrl}` : defaultPhotoUrl}
          alt={contact.fullName}
        />
        <div className="contact-info">
          <h3>{contact.fullName}</h3>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Address:</strong> {contact.address}</p>
        </div>
      </div>
      <div className="detail-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ContactDetail;