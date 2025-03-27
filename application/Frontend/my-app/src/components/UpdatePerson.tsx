import React, { useState } from 'react';
import { updatePerson } from '../api/api';

const UpdatePerson: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [job, setJob] = useState<string>('');

  const handleUpdate = async () => {
    try {
      const response = await updatePerson(id, { name, surname, job });
      console.log('Person updated:', response);
      alert('Person updated successfully!');
    } catch (error) {
      console.error('Error updating person:', error);
      alert('Error updating person');
    }
  };

  return (
    <div>
      <h2>Update Person</h2>
      <input
        type="text"
        placeholder="Person ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdatePerson;