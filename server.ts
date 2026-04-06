import express from "express";
import cors from "cors";
import { TrafficEnv } from "./env/trafficEnv.js";

const app = express();

// ✅ FIX: allow empty body
app.use(express.json({ strict: false }));
app.use(cors());

const PORT = Number(process.env.PORT) || 3000;

const env = new TrafficEnv();
let currentState = env.reset();

// HEALTH
app.get("/", (req, res) => {
  res.send("OK");
});

// RESET
app.post("/reset", (req, res) => {
  try {
    currentState = env.reset();

    const observation = [
      Number(currentState.north),
      Number(currentState.south),
      Number(currentState.east),
      Number(currentState.west),
      currentState.currentLight === "NS" ? 0 : 1
    ];

    res.json({
      observation,
      reward: 0,
      terminated: false,
      truncated: false,
      info: {}
    });
  } catch {
    res.json({
      observation: [0, 0, 0, 0, 0],
      reward: 0,
      terminated: false,
      truncated: false,
      info: {}
    });
  }
});

// STEP
app.post("/step", (req, res) => {
  try {
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

    res.json({
      observation,
      reward: Number(result.reward ?? 0),
      terminated: false,
      truncated: false,
      info: {}
    });
  } catch {
    res.json({
      observation: [0, 0, 0, 0, 0],
      reward: 0,
      terminated: false,
      truncated: false,
      info: {}
    });
  }
});

// IMPORTANT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});