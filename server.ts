import express from "express";
import cors from "cors";
import { TrafficEnv } from "./env/trafficEnv.js";

const app = express();

// ❌ DO NOT use express.json (causes OpenEnv issues)
app.use(cors());

// ✅ FIX: ensure number type
const PORT = Number(process.env.PORT) || 3000;

// ENV
const env = new TrafficEnv();
let currentState = env.reset();

// HEALTH
app.get("/", (_, res) => {
  res.send("OK");
});

// RESET (no dependency on body)
app.post("/reset", (_, res) => {
  currentState = env.reset();

  const observation = [
    currentState.north,
    currentState.south,
    currentState.east,
    currentState.west,
    currentState.currentLight === "NS" ? 0 : 1
  ];

  return res.status(200).json({
    observation,
    reward: 0,
    terminated: false,
    truncated: false,
    info: {}
  });
});

// STEP (safe handling)
app.post("/step", (req, res) => {
  let action = 0;

  try {
    if (req.body && typeof req.body.action !== "undefined") {
      action = Number(req.body.action);
    }
  } catch {
    action = 0;
  }

  const result = env.step(action);
  currentState = result.state;

  const observation = [
    currentState.north,
    currentState.south,
    currentState.east,
    currentState.west,
    currentState.currentLight === "NS" ? 0 : 1
  ];

  return res.status(200).json({
    observation,
    reward: result.reward ?? 0,
    terminated: false,
    truncated: false,
    info: {}
  });
});

// START SERVER (CRITICAL)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on ${PORT}`);
});