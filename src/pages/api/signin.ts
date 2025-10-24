import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  balance: number;
  nfts: { id: string; name: string; value: number }[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan email o password' });
  }

  const filePath = path.join(process.cwd(), 'src/data/users.json');
  const usersJson = fs.readFileSync(filePath, 'utf-8');
  const users: User[] = JSON.parse(usersJson).users;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const { password: _, ...userWithoutPassword } = user;

  return res.status(200).json({
    message: 'Inicio de sesión exitoso',
    user: userWithoutPassword,
  });
}
