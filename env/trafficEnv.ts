export class TrafficEnv {
  state: any;

  reset() {
    this.state = {
      north: Math.floor(Math.random() * 10),
      south: Math.floor(Math.random() * 10),
      east: Math.floor(Math.random() * 10),
      west: Math.floor(Math.random() * 10),
      currentLight: "NS"
    };
    return this.state;
  }

  step(action: number) {
    if (action === 1) {
      this.state.currentLight =
        this.state.currentLight === "NS" ? "EW" : "NS";
    }

    this.state.north = Math.max(0, this.state.north - 1);
    this.state.south = Math.max(0, this.state.south - 1);
    this.state.east = Math.max(0, this.state.east - 1);
    this.state.west = Math.max(0, this.state.west - 1);

    const reward = -(
      this.state.north +
      this.state.south +
      this.state.east +
      this.state.west
    );

    return {
      state: this.state,
      reward
    };
  }
}