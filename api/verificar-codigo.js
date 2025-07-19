export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const codigos = {
    "123456": "🎁 10% de regalo",
    "654321": "🎁 500 fichas",
    "111222": "🚫 Sin premio, intentá en la próxima carga",
    "333444": "🎁 2000 fichas",
    "777888": "🚫 Sin premio, intentá en la próxima carga",
    "999000": "🎁 20% de regalo",
    "456789": "🚫 Sin premio, intentá en la próxima carga",
    "789123": "🎁 100 fichas",
    "321654": "🚫 Sin premio, intentá en la próxima carga",
    "147258": "🎁 3000 fichas"
  };

  // ⚠️ Temporal: esto no guarda los usados realmente
  const usados = [];

  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ valido: false, mensaje: "⚠️ Ingresá un código." });
  }

  if (usados.includes(codigo)) {
    return res.status(200).json({ valido: false, mensaje: "🚫 Código ya fue usado." });
  }

  if (codigos[codigo]) {
    usados.push(codigo); // Esto no se guarda entre recargas
    return res.status(200).json({ valido: true, mensaje: codigos[codigo] });
  } else {
    return res.status(200).json({ valido: false, mensaje: "❌ Código inválido. Probá con otro." });
  }
}
