import express from 'express';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// ✔ Ruta para verificar que el backend está activo
app.get('/api', (req, res) => {
  res.send('🚀 API de Puka Koi funcionando correctamente');
});

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
