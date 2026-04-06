import { TrafficEnv } from "./env/trafficEnv.js";
import { Agent } from "./agent/qAgent.js";

const env = new TrafficEnv();
const agent = new Agent();

// (before training)
let randomTotal = 0;

for (let i = 0; i < 50; i++) {
    let state = env.reset();

    for (let t = 0; t < 100; t++) {
        const action = Math.random() < 0.5 ? 0 : 1;
        const res = env.step(action);
        state = res.state;

        randomTotal +=
            state.north +
            state.south +
            state.east +
            state.west;
    }
}

// TRAINED AGENT
let trainedTotal = 0;

for (let i = 0; i < 50; i++) {
    let state = env.reset();

    for (let t = 0; t < 100; t++) {
        const action = agent.act(state);
        const res = env.step(action);
        state = res.state;

        trainedTotal +=
            state.north +
            state.south +
            state.east +
            state.west;
    }
}

console.log("Random policy congestion:", randomTotal / 50);
console.log("Trained AI congestion:", trainedTotal / 50);