import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPassword,
  deleteUser
} from '../services/user.service';
import { AppError } from '../utils/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email) throw new AppError('El campo "email" es obligatorio', 400);
  if (!password) throw new AppError('El campo "password" es obligatorio', 400);

  const existing = await getUserByEmail(email);
  if (existing) {
    throw new AppError('El email ya está registrado', 400);
  }

  await createUser({ email, password, name });
  res.status(201).json({ message: 'Usuario creado correctamente' });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email y password son obligatorios', 400);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}

export async function changePassword(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Debes enviar la contraseña actual y la nueva', 400);
  }

  const user = await getUserById(id);
  if (!user) throw new AppError('Usuario no encontrado', 404);

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new AppError('Contraseña actual incorrecta', 401);

  const newHash = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(id, newHash);

  res.json({ message: 'Contraseña actualizada correctamente' });
}

export async function removeUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await getUserById(id);
  if (!user) throw new AppError('Usuario no encontrado', 404);

  await deleteUser(id);
  res.json({ message: 'Usuario eliminado correctamente' });
}
