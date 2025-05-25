import { db } from '../config/db';
import { Product } from '../models/product.model';

// Obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  const [rows] = await db.query('SELECT * FROM products ORDER BY id ASC');
  return rows as Product[];
}

// Obtener un producto por ID
export async function getProductById(id: number): Promise<Product | null> {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  const result = (rows as Product[])[0];
  return result || null;
}

// Crear un nuevo producto
export async function createProduct(product: Omit<Product, 'id'>): Promise<void> {
  const { name, price, description, image, category, visibility } = product;
  await db.query(
    `INSERT INTO products (name, price, description, image, category, visibility)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, price, description || '', image, category, visibility]
  );
}

// Actualizar un producto
export async function updateProduct(id: number, updates: Partial<Product>): Promise<void> {
  const fields = Object.entries(updates)
    .map(([key]) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(updates);
  await db.query(`UPDATE products SET ${fields} WHERE id = ?`, [...values, id]);
}

// Eliminar un producto
export async function deleteProduct(id: number): Promise<void> {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
}
