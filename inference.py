import random

class TrafficEnv:
    def __init__(self):
        self.reset()

    def reset(self):
        self.state = [
            random.randint(0, 10),
            random.randint(0, 10),
            random.randint(0, 10),
            random.randint(0, 10),
            0
        ]
        return self.state

    def step(self, action):
        reward = -sum(self.state[:4])

        self.state = [
            max(0, s - random.randint(0, 2)) for s in self.state[:4]
        ] + [action]

        return self.state, reward, False, {}

env = TrafficEnv()

def reset():
    obs = env.reset()
    return {
        "observation": obs,
        "reward": 0,
        "terminated": False,
        "truncated": False,
        "info": {}
    }

def step(action):
    obs, reward, done, info = env.step(action)
    return {
        "observation": obs,
        "reward": reward,
        "terminated": False,
        "truncated": False,
        "info": {}
    }