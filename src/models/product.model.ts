export interface Product {
  id?: number; // será generado por la BD
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  visibility: boolean;
}
