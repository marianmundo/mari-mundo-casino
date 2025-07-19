export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const codigos = {
    "TF100": "🎁 100 fichas",
    "TF200": "🎁 200 fichas",
    "TF10K": "💸 Transferencia de 10k",
    "TF3K": "🎁 3000 fichas",
    "TF500": "🎁 500 fichas",
    "TF20P": "🎁 20% de regalo",
    "TF30P": "🎁 30% de regalo",
    "TF5P": "🎁 5% de regalo",
    "TF0": "❌ Sin premio, intentá en la próxima carga",
    "TFVIP": "🎊 2000 fichas VIP"
  };

  const usados = [];

  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ valido: false, mensaje: "⚠️ Ingresá un código." });
  }

  if (usados.includes(codigo)) {
    return res.status(200).json({ valido: false, mensaje: "🚫 Código ya fue usado." });
  }

  if (codigos[codigo]) {
    usados.push(codigo);
    return res.status(200).json({ valido: true, mensaje: codigos[codigo] });
  } else {
    return res.status(200).json({ valido: false, mensaje: "❌ Código inválido. Probá con otro." });
  }
}
