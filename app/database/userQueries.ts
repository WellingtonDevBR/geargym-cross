import { initializeDatabase, executeSql } from './dbClient';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

export const getUser = async (email: string, password: string): Promise<User | null> => {
  const db = await initializeDatabase();
  const query = 'SELECT * FROM User WHERE LOWER(email) = LOWER(?) AND password = ?';
  const params = [email.toLowerCase(), password];
  try {
    const result = await executeSql<User>(db, query, params);
    return result.length ? result[0] : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const addUser = async (name: string, email: string, password: string): Promise<void> => {
  const db = await initializeDatabase();
  
  // Check if the email is already registered
  const checkQuery = 'SELECT * FROM User WHERE LOWER(email) = LOWER(?)';
  const checkParams = [email.toLowerCase()];
  try {
    const existingUsers = await executeSql<User>(db, checkQuery, checkParams);
    if (existingUsers.length > 0) {
      throw new Error('Email already registered');
    }

    // If email is not registered, proceed with adding the user
    const insertQuery = 'INSERT INTO User (name, email, password) VALUES (?, ?, ?)';
    const insertParams = [name, email.toLowerCase(), password];
    await executeSql(db, insertQuery, insertParams);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
