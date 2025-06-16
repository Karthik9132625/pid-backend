const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  const { ku, pu } = req.body;

  // Check if values are present and valid
  if (!ku || !pu || isNaN(ku) || isNaN(pu)) {
    return res.status(400).json({ error: "Invalid or missing Ku or Pu values." });
  }

  // Ziegler–Nichols classic tuning method
  const Kp = 0.6 * ku;
  const Ki = (2 * Kp) / pu;
  const Kd = (Kp * pu) / 8;

  res.json({
    Kp: Kp.toFixed(2),
    Ki: Ki.toFixed(2),
    Kd: Kd.toFixed(2),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ PID backend running on port ${port}`));
