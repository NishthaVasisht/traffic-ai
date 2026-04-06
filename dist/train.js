import { TrafficEnv } from "./env/trafficEnv.js";
import { Agent } from "./agent/qAgent.js";
const env = new TrafficEnv();
const agent = new Agent();
for (let ep = 0; ep < 500; ep++) {
    let state = env.reset();
    for (let t = 0; t < 100; t++) {
        const action = agent.act(state);
        const { state: next, reward } = env.step(action);
        agent.update(state, action, reward, next);
        state = next;
    }
}
console.log("Training done");
