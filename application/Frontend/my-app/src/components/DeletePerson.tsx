import React, { useState } from 'react';
import { deletePerson } from '../api/api';

const DeletePerson: React.FC = () => {
  const [id, setId] = useState<string>('');

  const handleDelete = async () => {
    try {
      await deletePerson(id);
      alert('Person deleted successfully!');
      setId('');
    } catch (error) {
      console.error('Error deleting person:', error);
      alert('Error deleting person');
    }
  };

  return (
    <div>
      <h2>Delete Person</h2>
      <input
        type="text"
        placeholder="Person ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeletePerson;