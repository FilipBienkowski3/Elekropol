import React, { useState, FormEvent } from 'react';
import { addPerson } from '../api/api';

const AddPerson: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [job, setJob] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newPerson = { id: Date.now().toString(), name, surname, job };

    try {
      const response = await addPerson(newPerson);
      console.log('Person added:', response);
      alert('Person added successfully!');
    } catch (error) {
      console.error('Error adding person:', error);
      alert('Error adding person');
    }
  };

  return (
    <div>
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPerson;