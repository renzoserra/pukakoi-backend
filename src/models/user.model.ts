export interface User {
  id?: number;
  email: string;
  password: string;   // store hashed password
  name?: string;
}
