import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('./api/codigos.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;

  const codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));

  if (codigos[codigo]) {
    return res.json({ estado: "valido", mensaje: codigos[codigo] });
  }

  return res.json({ estado: "invalido" });
}
