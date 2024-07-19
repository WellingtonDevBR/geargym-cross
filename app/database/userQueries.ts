import { initializeDatabase, executeSql } from './dbClient';

interface User {
  id: number;
  email: string;
  password: string;
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

const initDb = async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDb();
