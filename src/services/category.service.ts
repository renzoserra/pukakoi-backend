import { db } from '../config/db';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { AppError } from '../utils/AppError';

export async function getAllCategories(): Promise<Category[]> {
  const [rows] = await db.query('SELECT * FROM categories ORDER BY `order` ASC');
  return rows as Category[];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  const result = (rows as Category[])[0];
  return result || null;
}

export async function createCategory(category: Category): Promise<void> {
  const { id, label, icon, order, visibility } = category;
  await db.query(
    'INSERT INTO categories (id, label, icon, `order`, visibility) VALUES (?, ?, ?, ?, ?)',
    [id, label, icon, order, visibility]
  );
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  const fields = Object.entries(updates)
    .map(([key]) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(updates);
  await db.query(`UPDATE categories SET ${fields} WHERE id = ?`, [...values, id]);
}

export async function deleteCategory(id: string): Promise<void> {
  // Validar si hay productos relacionados
  const relatedProducts = await getProductsByCategory(id);

  if (relatedProducts.length > 0) {
    const productNames = relatedProducts.map(p => p.name);
    throw new AppError(
      `No se puede eliminar la categoría "${id}" porque está asociada a los siguientes productos: ${productNames.join(', ')}`,
      400
    );
  }

  // Si no hay productos, eliminar categoría
  await db.query('DELETE FROM categories WHERE id = ?', [id]);
}
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const [rows] = await db.query('SELECT * FROM products WHERE category = ?', [categoryId]);
  return rows as Product[];
}
