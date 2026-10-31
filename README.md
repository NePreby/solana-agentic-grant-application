# SolanaPulse AI: Autonomous MEV & Priority Fee Telemetry Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-purple.svg)](https://solana.com)
[![Superteam Grant](https://img.shields.io/badge/Superteam-Agentic%20Engineering%20Grant-green.svg)](https://superteam.fun/earn/grants/agentic-engineering)

**SolanaPulse AI** is an autonomous telemetry agent designed to optimize transaction inclusion and mitigate sandwich/MEV losses on Solana. Built entirely using Agentic AI development workflows (Claude 3.7 Sonnet / Codex / Antigravity), this project demonstrates how idea-to-production cycles collapse when leveraging modern AI engineering paradigms.

---

## 🚀 Key Features

1. **Real-Time Local Fee Market Sampling**: Directly samples `getRecentPrioritizationFees` across writable accounts (e.g. Raydium, Whirlpools, Phoenix, Orca).
2. **Dynamic Percentile Computation**: Computes exact moving micro-lamport fee percentiles ($P_{50}, P_{75}, P_{95}$) over the last 150 slots.
3. **Agentic Inclusion Advisor**: Emits structured urgency classifications (`LOW`, `NORMAL`, `HIGH`, `URGENT`) and dynamic fee recommendations.
4. **Resilient Failover**: Handles RPC rate limits and connection drops with automatic exponential backoff and simulated fallback telemetry.

---

## 🛠️ Quickstart

### 1. Installation & Build
```bash
git clone https://github.com/NePreby/solana-agentic-grant-application.git
cd solana-agentic-grant-application
npm install
npm run build
```

### 2. Run Test Suite
```bash
npm test
```

### 3. Run Telemetry Agent
```bash
npm start
```

---

## 📦 Docker Support
```bash
docker build -t solanapulse-ai .
docker run --rm solanapulse-ai
```

---

## 📑 Superteam Grant Application Details
- **Grant Category**: Agentic Engineering Grant ($200 USDG)
- **Grant Listing**: [https://superteam.fun/earn/grants/agentic-engineering](https://superteam.fun/earn/grants/agentic-engineering)
- **Claude / Codex Transcript**: See [PROMPT_SESSION_TRANSCRIPT.md](./PROMPT_SESSION_TRANSCRIPT.md) for the verbatim prompt-to-prod session responding to:
  > *"help me apply for the agentic engineering grant by Superteam"*
- **Applicant GitHub**: [@NePreby](https://github.com/NePreby)
- **Solana Payout Wallet**: `WXuYrZ9hgQnNH6NF6HGUcX2M23YfwN2u9uGC31tvtqe`
