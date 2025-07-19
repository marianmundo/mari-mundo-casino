import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { codigo } = req.query;

  const filePath = path.join(process.cwd(), 'api', 'codigos.json');
  const codigos = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const mensaje = codigos[codigo];

  if (mensaje) {
    res.status(200).json({ valido: true, mensaje });
  } else {
    res.status(200).json({ valido: false });
  }
}
