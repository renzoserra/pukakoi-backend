import fs from 'fs';
import path from 'path';
import { db } from '../config/db';

type Category = {
    id: string;
    label: string;
    icon: string;
    order: number;
    visibility: boolean;
};

(async () => {
    try {
        const filePath = path.resolve(__dirname, '../data/categories.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const categories: Category[] = JSON.parse(rawData);

        for (const category of categories) {
            await db.query(
                `INSERT INTO categories (id, label, icon, \`order\`, visibility)
   VALUES (?, ?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE
     label=VALUES(label),
     icon=VALUES(icon),
     \`order\`=VALUES(\`order\`),
     visibility=VALUES(visibility)`,
                [category.id, category.label, category.icon, category.order, category.visibility]
            );
        }

        console.log('✅ Categorías insertadas correctamente.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar categorías:', error);
        process.exit(1);
    }
})();
