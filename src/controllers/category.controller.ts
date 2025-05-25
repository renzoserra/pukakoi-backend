import { Request, Response } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/category.service';
import { Category } from '../models/category.model';
import { AppError } from '../utils/AppError';

// GET /api/categories
export async function listCategories(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.json(categories);
}

// GET /api/categories/:id
export async function getCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await getCategoryById(id);
  if (!category) {
    throw new AppError(`La categoría con ID "${id}" no existe.`, 404);
  }
  res.json(category);
}

// POST /api/categories
export async function addCategory(req: Request, res: Response) {
  const { id, label, icon, order, visibility } = req.body;

  // Validaciones obligatorias
  if (!id) throw new AppError('El campo "id" es obligatorio.', 400);
  if (!label) throw new AppError('El campo "label" es obligatorio.', 400);
  if (!icon) throw new AppError('El campo "icon" es obligatorio.', 400);

  // Validar si el ID ya existe
  const existing = await getCategoryById(id);
  if (existing) {
    throw new AppError(`El ID "${id}" ya existe en la base de datos.`, 400);
  }

  // Si no viene "order", calcular el siguiente
  let newOrder = order;
  if (newOrder === undefined) {
    const categories = await getAllCategories();
    const maxOrder = Math.max(...categories.map(cat => cat.order), 0);
    newOrder = maxOrder + 1;
  }

  // Si no viene "visibility", asumir true
  const isVisible = visibility === undefined ? true : visibility;

  const newCategory: Category = {
    id,
    label,
    icon,
    order: newOrder,
    visibility: isVisible
  };

  await createCategory(newCategory);
  res.status(201).json({ message: 'Categoría creada correctamente' });
}

// PUT /api/categories/:id
export async function editCategory(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;

  // Validar que la categoría exista
  const existing = await getCategoryById(id);
  if (!existing) {
    throw new AppError(`La categoría con ID "${id}" no existe.`, 400);
  }

  // Validar tipo de "order"
  if ('order' in updates && typeof updates.order !== 'number') {
    throw new AppError('El campo "order" debe ser un número.', 400);
  }

  // Validar tipo de "visibility"
  if ('visibility' in updates && typeof updates.visibility !== 'boolean') {
    throw new AppError('El campo "visibility" debe ser true o false (boolean).', 400);
  }

  // Validar que venga al menos un campo
  if (Object.keys(updates).length === 0) {
    throw new AppError('Debes enviar al menos un campo para actualizar.', 400);
  }

  await updateCategory(id, updates);
  res.json({ message: 'Categoría actualizada correctamente' });
}

// DELETE /api/categories/:id
export async function removeCategory(req: Request, res: Response) {
  const { id } = req.params;

  // Validar existencia
  const existing = await getCategoryById(id);
  if (!existing) {
    throw new AppError(`La categoría con ID "${id}" no existe.`, 400);
  }

  await deleteCategory(id);

  res.json({
    message: `Categoría eliminada correctamente`,
    deleted: existing
  });
}

