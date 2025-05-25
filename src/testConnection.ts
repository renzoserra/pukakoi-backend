import { db } from './config/db';

(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
})();
