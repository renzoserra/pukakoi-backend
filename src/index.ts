import express from 'express';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
