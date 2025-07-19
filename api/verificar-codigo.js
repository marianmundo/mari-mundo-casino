import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('api/codigos.json');
const usadosPath = path.resolve('api/usados.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensaje: 'Método no permitido' });
  }

  const { codigo } = req.body;

  const codigos = JSON.parse(fs.readFileSync(codigosPath));
  const usados = JSON.parse(fs.readFileSync(usadosPath));

  if (usados[codigo]) {
    return res.json({ estado: 'usado' });
  }

  if (codigos[codigo]) {
    usados[codigo] = true;
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.json({ estado: 'valido', mensaje: codigos[codigo] });
  } else {
    return res.json({ estado: 'invalido' });
  }
}
