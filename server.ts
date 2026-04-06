import express from "express";
import { TrafficEnv } from "./env/trafficEnv.js";

const app = express();
app.use(express.json());

// ✅ IMPORTANT for deployment
const PORT = process.env.PORT || 3000;

const env = new TrafficEnv();
let currentState = env.reset();

// ✅ HEALTH CHECK (some validators need this)
app.get("/", (req, res) => {
  res.send("🚦 Traffic RL Server Running");
});

// ✅ RESET endpoint
app.post("/reset", (req, res) => {
    currentState = env.reset();
  
    res.json({
      observation: currentState,
      reward: 0,
      done: false,
      info: {}
    });
  });

// ✅ STEP endpoint
app.post("/step", (req, res) => {
    const { action } = req.body;
  
    if (action === undefined) {
      return res.status(400).json({ error: "Action is required" });
    }
  
    const result = env.step(action);
    currentState = result.state;
  
    res.json({
      observation: result.state,
      reward: result.reward,
      done: result.done,
      info: {}
    });
  });

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});