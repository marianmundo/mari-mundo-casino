import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { codigo } = req.body;

  const codigosPath = path.join(process.cwd(), 'api', 'codigos.json');
  const usadosPath = path.join(process.cwd(), 'api', 'usados.json');

  const codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));
  const usados = JSON.parse(fs.readFileSync(usadosPath, 'utf8'));

  if (usados[codigo]) {
    return res.status(200).json({ estado: "usado" });
  }

  const mensaje = codigos[codigo];

  if (mensaje) {
    usados[codigo] = true;
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.status(200).json({ estado: "valido", mensaje });
  } else {
    return res.status(200).json({ estado: "invalido" });
  }
}
