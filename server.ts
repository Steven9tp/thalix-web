import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for QR Generation (Simulated Deuna/Pichincha)
  app.post("/api/payments/generate-qr", (req, res) => {
    const { amount, orderId } = req.body;
    
    // Base Deuna QR data (simulated)
    // In a real scenario, this would be a base URL or token from Deuna
    const baseDeunaData = "deuna://payment/thalix-hub";
    
    // Generate the dynamic payment data
    // Usually includes merchant ID, amount, and reference
    const qrData = `${baseDeunaData}?amount=${amount}&ref=${orderId}&bank=pichincha`;
    
    res.json({ 
      qrData,
      bank: "Banco Pichincha",
      method: "Deuna",
      amount,
      orderId
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
