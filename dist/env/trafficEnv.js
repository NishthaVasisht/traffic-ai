export class TrafficEnv {
    reset() {
        this.state = {
            north: this.rand(),
            south: this.rand(),
            east: this.rand(),
            west: this.rand(),
            currentLight: "NS"
        };
        return this.state;
    }
    rand() {
        return Math.floor(Math.random() * 10);
    }
    step(action) {
        if (action === 1) {
            this.state.currentLight =
                this.state.currentLight === "NS" ? "EW" : "NS";
        }
        if (this.state.currentLight === "NS") {
            this.state.north = Math.max(0, this.state.north - 3);
            this.state.south = Math.max(0, this.state.south - 3);
        }
        else {
            this.state.east = Math.max(0, this.state.east - 3);
            this.state.west = Math.max(0, this.state.west - 3);
        }
        this.state.north += this.rand() % 3;
        this.state.south += this.rand() % 3;
        this.state.east += this.rand() % 3;
        this.state.west += this.rand() % 3;
        const total = this.state.north +
            this.state.south +
            this.state.east +
            this.state.west;
        return {
            state: this.state,
            reward: -total,
            done: false
        };
    }
}
