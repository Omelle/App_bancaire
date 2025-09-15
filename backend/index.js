const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

app.get("/", (req, res) => {
  res.json({ message: "API bancaire futuriste avec MongoDB 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend sur le port ${PORT}`));
