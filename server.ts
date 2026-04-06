import express from "express";
import cors from "cors";
import { TrafficEnv } from "./env/trafficEnv.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Port (important for Render)
const PORT = process.env.PORT || 3000;

// ✅ Environment
const env = new TrafficEnv();
let currentState = env.reset();

// ✅ Health check (important for validators)
app.get("/", (req, res) => {
    res.status(200).send("🚦 Traffic RL Server Running");
});

// ✅ RESET endpoint (OpenEnv format)
app.post("/reset", (req, res) => {
    try {
        currentState = env.reset();

        const observation = [
            currentState.north,
            currentState.south,
            currentState.east,
            currentState.west,
            currentState.currentLight === "NS" ? 0 : 1
        ];

        res.status(200).json({
            observation,
            reward: 0,
            done: false,
            info: {}
        });
    } catch (error) {
        console.error("RESET ERROR:", error);
        res.status(500).json({ error: "Reset failed" });
    }
});

// ✅ STEP endpoint (OpenEnv format)
app.post("/step", (req, res) => {
    try {
        const action = req.body?.action ?? 0;

        const result = env.step(action);
        currentState = result.state;

        const observation = [
            currentState.north,
            currentState.south,
            currentState.east,
            currentState.west,
            currentState.currentLight === "NS" ? 0 : 1
        ];

        res.status(200).json({
            observation,
            reward: result.reward ?? 0,
            done: result.done ?? false,
            info: {}
        });
    } catch (error) {
        console.error("STEP ERROR:", error);
        res.status(500).json({ error: "Step failed" });
    }
});

// ✅ Fallback route (prevents "Not Found" issues)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});