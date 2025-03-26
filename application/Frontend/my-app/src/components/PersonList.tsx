import React, { useState, useEffect } from 'react';
 import { getPersons } from '../api/api';
 
 interface Person {
   id: string;
   name: string;
   surname: string;
   job: string;
 }
 
 const PersonList: React.FC = () => {
   const [persons, setPersons] = useState<Person[]>([]);
 
   useEffect(() => {
     const fetchPersons = async () => {
       try {
         const response = await getPersons();
         setPersons(response); 
       } catch (error) {
         console.error('Error fetching persons:', error);
       }
     };
 
     fetchPersons();
   }, []);
 
   return (
     <div>
       <h2>Persons List</h2>
       <ul>
         {persons.map((person) => (
           <li key={person.id}>
             {person.name} {person.surname} - {person.job}
           </li>
         ))}
       </ul>
     </div>
   );
 };
 
 export default PersonList;