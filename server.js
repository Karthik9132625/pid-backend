const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  const { power, voltage, current, resistance, temp } = req.body;

  // Sample constants for Ku (ultimate gain) and Pu (oscillation period)
  const Ku = 50; // You will replace this with real measured value later
  const Pu = 20; // Same here

  // Ziegler–Nichols PID tuning (classic method)
  const Kp = 0.6 * Ku;
  const Ki = (2 * Kp) / Pu;
  const Kd = (Kp * Pu) / 8;

  res.json({
    Kp: Kp.toFixed(2),
    Ki: Ki.toFixed(2),
    Kd: Kd.toFixed(2),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`PID backend running on port ${port}`));