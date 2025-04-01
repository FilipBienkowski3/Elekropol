import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
  }
  
  const DeleteUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/clients');
          if (!response.ok) {
            throw new Error('Błąd podczas pobierania użytkowników');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Błąd:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleDeleteUser = async (userId: string) => {
      try {
        const response = await fetch(`http://localhost:3000/clients/delete/${userId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Błąd z backendu:', errorData);
          throw new Error('Błąd podczas usuwania użytkownika');
        }
  
        setUsers(users.filter((user) => user._id !== userId));
        alert('Użytkownik został usunięty pomyślnie');
      } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas usuwania użytkownika');
      }
    };
  
    return (
      <div className="delete-user-container">
        <h1>Usuń użytkownika</h1>
        <div className="user-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
                <p>Typ: {user.type}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DeleteUser;