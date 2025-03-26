import React, { useState, FormEvent } from 'react';
 import { addPerson } from '../api/api';
 
 interface Person {
   id: string;
   name: string;
   surname: string;
   job: string;
 }
 
 const AddPerson: React.FC = () => {
   const [id, setId] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [job, setJob] = useState<string>('');
 
   const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
 
     const person: Person = { id, name, surname, job };
 
     try {
       const response = await addPerson(person);
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
           placeholder="ID"
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
         <button type="submit">Add Person</button>
       </form>
     </div>
   );
 };
 
 export default AddPerson;