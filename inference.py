import random

state = None

def reset():
    global state
    state = [
        random.randint(0, 10),
        random.randint(0, 10),
        random.randint(0, 10),
        random.randint(0, 10),
        0
    ]
    return {
        "observation": state,
        "reward": 0,
        "terminated": False,
        "truncated": False,
        "info": {}
    }

def step(action):
    global state

    state[4] = action

    for i in range(4):
        state[i] = max(0, state[i] - random.randint(0, 2))

    reward = -sum(state[:4])

    return {
        "observation": state,
        "reward": reward,
        "terminated": False,
        "truncated": False,
        "info": {}
    }

def state_fn():
    global state
    return {
        "observation": state
    }