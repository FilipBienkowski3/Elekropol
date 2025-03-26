import React, { useState } from 'react';
 import { deletePerson } from '../api/api';
 
 const DeletePerson: React.FC = () => {
   const [deleteId, setDeleteId] = useState<string>('');
 
   const handleDeletePerson = async () => {
     try {
       await deletePerson(deleteId);
       alert('Person deleted successfully');
       setDeleteId('');
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
         value={deleteId}
         onChange={(e) => setDeleteId(e.target.value)}
       />
       <button onClick={handleDeletePerson}>Delete</button>
     </div>
   );
 };
 
 export default DeletePerson;