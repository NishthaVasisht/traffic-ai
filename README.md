# AI Traffic Signal Optimization using Reinforcement Learning

An intelligent traffic control system that reduces congestion using Q-learning.

➡️ Achieves ~34% reduction in congestion compared to random signals.

## Problem
Traffic congestion at intersections leads to delays and inefficiency.

## Solution
We built a Reinforcement Learning agent using Q-learning that dynamically controls traffic lights.

## State
Number of cars in 4 directions + current signal

## Actions
- 0 → Keep signal
- 1 → Switch signal

## Reward
Negative of total waiting cars

## Result
The agent learns to minimize congestion over time.

## Innovation
This system can be extended to smart cities for real-time adaptive traffic control.

## How to run
npm install  
npm run train  
npm run eval