export class Agent {
    constructor() {
        this.qTable = {};
    }
    key(s) {
        return `${s.north}-${s.south}-${s.east}-${s.west}-${s.currentLight}`;
    }
    act(state) {
        const k = this.key(state);
        if (!this.qTable[k])
            this.qTable[k] = [0, 0];
        if (Math.random() < 0.1)
            return Math.floor(Math.random() * 2);
        return this.qTable[k][0] > this.qTable[k][1] ? 0 : 1;
    }
    update(s, a, r, ns) {
        const k = this.key(s);
        const nk = this.key(ns);
        if (!this.qTable[k])
            this.qTable[k] = [0, 0];
        if (!this.qTable[nk])
            this.qTable[nk] = [0, 0];
        const lr = 0.1;
        const gamma = 0.9;
        const maxNext = Math.max(...this.qTable[nk]);
        this.qTable[k][a] +=
            lr * (r + gamma * maxNext - this.qTable[k][a]);
    }
}
