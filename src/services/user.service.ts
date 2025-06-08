import { db } from '../config/db';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

export async function createUser(user: Omit<User, 'id'>): Promise<void> {
  const { email, password, name } = user;
  const hash = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, hash, name || null]
  );
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const result = (rows as User[])[0];
  return result || null;
}

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  const result = (rows as User[])[0];
  return result || null;
}

export async function updateUserPassword(id: number, newHash: string): Promise<void> {
  await db.query('UPDATE users SET password = ? WHERE id = ?', [newHash, id]);
}

export async function deleteUser(id: number): Promise<void> {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
}
