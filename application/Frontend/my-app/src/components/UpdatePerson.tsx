import React, { useState } from 'react';
 import { updatePerson } from '../api/api';
 
 interface PersonData {
   name: string;
   surname: string;
   job: string;
 }
 
 const UpdatePerson: React.FC = () => {
   const [updateId, setUpdateId] = useState<string>('');
   const [updatedPersonData, setUpdatedPersonData] = useState<PersonData>({
     name: '',
     surname: '',
     job: '',
   });
 
   const handleUpdatePerson = async () => {
     try {
       const response = await updatePerson(updateId, updatedPersonData);
       console.log('Person updated:', response);
       alert('Person updated successfully');
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
         value={updateId}
         onChange={(e) => setUpdateId(e.target.value)}
       />
       <input
         type="text"
         placeholder="New Name"
         value={updatedPersonData.name}
         onChange={(e) => setUpdatedPersonData({ ...updatedPersonData, name: e.target.value })}
       />
       <input
         type="text"
         placeholder="New Surname"
         value={updatedPersonData.surname}
         onChange={(e) => setUpdatedPersonData({ ...updatedPersonData, surname: e.target.value })}
       />
       <input
         type="text"
         placeholder="New Job"
         value={updatedPersonData.job}
         onChange={(e) => setUpdatedPersonData({ ...updatedPersonData, job: e.target.value })}
       />
       <button onClick={handleUpdatePerson}>Update</button>
     </div>
   );
 };
 
 export default UpdatePerson;