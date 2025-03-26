import React from 'react';
 import AddPerson from './components/AddPerson';
 import DeletePerson from './components/DeletePerson';
 import UpdatePerson from './components/UpdatePerson';
 import PersonList from './components/PersonList';
 
 const App: React.FC = () => {
   return (
     <div>
       <h1>Person Management</h1>
       <AddPerson />
       <DeletePerson />
       <UpdatePerson />
       <PersonList />
     </div>
   );
 };
 
 export default App;