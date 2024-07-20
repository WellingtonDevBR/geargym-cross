import { SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite';

export const initializeDatabase = async (): Promise<SQLiteDatabase> => {
  return await openDatabaseAsync('GearGymDB.db');
};

export const executeSql = async <T>(db: SQLiteDatabase, sql: string, params: any[] = []): Promise<T[]> => {
  const statement = await db.prepareAsync(sql);
  const result = await statement.executeAsync(...params);
  const rows = await result.getAllAsync();
  await statement.finalizeAsync();
  return rows as T[];
};
