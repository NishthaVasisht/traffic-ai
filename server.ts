import express from "express";
import cors from "cors";
import { TrafficEnv } from "./env/trafficEnv.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT for Docker + OpenEnv
const PORT = Number(process.env.PORT) || 3000;

// Environment
const env = new TrafficEnv();
let currentState = env.reset();

// Health check
app.get("/", (req, res) => {
  res.status(200).send("🚦 Traffic RL Server Running");
});

// RESET
app.post("/reset", (req, res) => {
  currentState = env.reset();

  const observation = [
    Number(currentState.north),
    Number(currentState.south),
    Number(currentState.east),
    Number(currentState.west),
    currentState.currentLight === "NS" ? 0 : 1
  ];

  return res.json({
    observation,
    reward: 0,
    terminated: false,
    truncated: false,
    info: {}
  });
});

// STEP
app.post("/step", (req, res) => {
  const action = Number(req.body?.action ?? 0);

  const result = env.step(action);
  currentState = result.state;

  const observation = [
    Number(currentState.north),
    Number(currentState.south),
    Number(currentState.east),
    Number(currentState.west),
    currentState.currentLight === "NS" ? 0 : 1
  ];

  return res.json({
    observation,
    reward: Number(result.reward ?? 0),
    terminated: false,
    truncated: false,
    info: {}
  });
});

// Start server (CRITICAL FIX)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});