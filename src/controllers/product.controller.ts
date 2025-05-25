import { Request, Response } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../services/product.service';
import { Product } from '../models/product.model';
import { AppError } from '../utils/AppError';
import { getCategoryById } from '../services/category.service';

// GET /api/products
export async function listProducts(req: Request, res: Response) {
    const products = await getAllProducts();
    res.json(products);
}

// GET /api/products/:id
export async function getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await getProductById(id);

    if (!product) {
        throw new AppError(`El producto con ID ${id} no existe.`, 404);
    }

    res.json(product);
}

// POST /api/products
export async function addProduct(req: Request, res: Response) {
    try {
        const { name, price, description, image, category, visibility } = req.body

        // Validaciones obligatorias
        if (!name) throw new AppError('El campo "name" es obligatorio.', 400)
        if (!price) throw new AppError('El campo "price" es obligatorio.', 400)
        if (!category) throw new AppError('El campo "category" es obligatorio.', 400)

        // Validar existencia de la categoría
        const categoryExists = await getCategoryById(category)
        if (!categoryExists) throw new AppError(`La categoría "${category}" no existe.`, 400)

        // Si no viene imagen, usar placeholder por defecto
        const imageToUse = image || 'assets/images/placeholder.webp'

        const newProduct: Omit<Product, 'id'> = {
            name,
            price,
            description,
            image: imageToUse,
            category,
            visibility: visibility === undefined ? true : visibility,
        }

        const result = await createProduct(newProduct)
        res.status(201).json({ message: 'Producto creado correctamente', product: result })
    } catch (error: unknown) {
        console.error('❌ Error al crear producto:', error);

        if (error instanceof AppError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}


// PUT /api/products/:id
export async function editProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updates = req.body;

    const existing = await getProductById(id);
    if (!existing) {
      throw new AppError(`El producto con ID ${id} no existe.`, 400);
    }

    if ('price' in updates && typeof updates.price !== 'number') {
      throw new AppError('El campo "price" debe ser un número.', 400);
    }

    if ('visibility' in updates && typeof updates.visibility !== 'boolean') {
      throw new AppError('El campo "visibility" debe ser true o false.', 400);
    }

    await updateProduct(id, updates);
    res.json({ message: 'Producto actualizado correctamente' });

  } catch (error: unknown) {
    console.error('❌ Error al actualizar producto:', error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}


// DELETE /api/products/:id
export async function removeProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const existing = await getProductById(id);
    if (!existing) {
      throw new AppError(`El producto con ID ${id} no existe.`, 400);
    }

    await deleteProduct(id);
    res.json({
      message: 'Producto eliminado correctamente',
      deleted: existing
    });

  } catch (error: unknown) {
    console.error('❌ Error al eliminar producto:', error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}
