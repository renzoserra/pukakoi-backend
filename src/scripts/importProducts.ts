import fs from 'fs';
import path from 'path';
import { db } from '../config/db';
import { Product } from '../models/product.model';

async function importProducts() {
  try {
const filePath = path.resolve(process.cwd(), 'src', 'data', 'products.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const jsonProducts: Omit<Product, 'id' | 'visibility'>[] = JSON.parse(raw);

    const insertPromises = jsonProducts.map((p) => {
      const { name, price, description, image, category } = p;
      return db.query(
        `INSERT INTO products (name, price, description, image, category, visibility)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, price, description || '', image, category, true]
      );
    });

    await Promise.all(insertPromises);

    console.log(`✅ Productos importados correctamente: ${jsonProducts.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al importar productos:', error);
    process.exit(1);
  }
}

importProducts();
