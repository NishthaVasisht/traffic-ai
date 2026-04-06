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

    # update light
    state[4] = action

    # reduce traffic
    state[0] = max(0, state[0] - random.randint(0, 2))
    state[1] = max(0, state[1] - random.randint(0, 2))
    state[2] = max(0, state[2] - random.randint(0, 2))
    state[3] = max(0, state[3] - random.randint(0, 2))

    reward = -(state[0] + state[1] + state[2] + state[3])

    return {
        "observation": state,
        "reward": reward,
        "terminated": False,
        "truncated": False,
        "info": {}
    }