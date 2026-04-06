import requests

BASE_URL = "https://traffic-ai-8vxn.onrender.com"

print("[START]")

res = requests.post(f"{BASE_URL}/reset")
state = res.json()

print("[STEP]", state)

res = requests.post(f"{BASE_URL}/step", json={"action": 0})
print("[STEP]", res.json())

print("[END]")