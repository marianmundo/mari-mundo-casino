import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('./api/codigos.json');
const usadosPath = path.resolve('./api/usados.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;

  const codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));
  const usados = JSON.parse(fs.readFileSync(usadosPath, 'utf8'));

  if (usados[codigo]) {
    return res.json({ estado: "usado" });
  }

  if (codigos[codigo]) {
    usados[codigo] = true;
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.json({ estado: "valido", mensaje: codigos[codigo] });
  }

  return res.json({ estado: "invalido" });
}
