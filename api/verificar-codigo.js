import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('api/codigos.json');
const usadosPath = path.resolve('api/usados.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { codigo } = req.body;

  let codigos = {};
  let usados = [];

  try {
    codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo leer codigos.json' });
  }

  try {
    usados = JSON.parse(fs.readFileSync(usadosPath, 'utf8'));
  } catch (err) {
    usados = [];
  }

  if (usados.includes(codigo)) {
    return res.json({ estado: "usado" });
  }

  if (codigos[codigo]) {
    usados.push(codigo);
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.json({ estado: "valido", mensaje: codigos[codigo] });
  } else {
    return res.json({ estado: "invalido" });
  }
}
