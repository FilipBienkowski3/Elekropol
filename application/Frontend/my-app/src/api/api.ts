import axios, { AxiosResponse } from 'axios';
 
 // Typ dla osoby
 interface Person {
   id: string;
   name: string;
   surname: string;
   job: string;
 }
 
 // Konfiguracja axios
 const API = axios.create({
   baseURL: 'http://localhost:3000',
   headers: {
     'Content-Type': 'application/json',
   },
 });
 
 // GET: Pobierz wszystkie osoby
 export const getPersons = async (): Promise<Person[]> => {
   try {
     const response: AxiosResponse<Person[]> = await API.get('/person');
     return response.data; // response.data jest typu Person[]
   } catch (error) {
     console.error('Error fetching persons:', error);
     throw error;
   }
 };
 
 // POST: Dodaj nową osobę
 export const addPerson = async (person: Omit<Person, 'id'>): Promise<Person> => {
   try {
     const response: AxiosResponse<Person> = await API.post('/person/create', person);
     return response.data; // response.data jest typu Person
   } catch (error) {
     console.error('Error adding person:', error);
     throw error;
   }
 };
 
 // PUT: Zaktualizuj osobę
 export const updatePerson = async (id: string, personData: Partial<Person>): Promise<Person> => {
   try {
     const response: AxiosResponse<Person> = await API.put(`/person/update/${id}`, personData);
     return response.data; // response.data jest typu Person
   } catch (error) {
     console.error('Error updating person:', error);
     throw error;
   }
 };
 
 // DELETE: Usuń osobę
 export const deletePerson = async (id: string): Promise<void> => {
   try {
     await API.delete(`/person/delete/${id}`);
   } catch (error) {
     console.error('Error deleting person:', error);
     throw error;
   }
 };
 
 export default API;