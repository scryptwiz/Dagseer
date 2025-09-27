# DAGSeer

Forecast the Future, On-Chain.

[Live Demo](https://dagseer.vercel.app) | [GitHub](https://github.com/scryptwiz/Dagseer) | [Video Demo]([https://github.com/scryptwiz/Dagseer](https://drive.google.com/file/d/1VUX-CKqQcX3OL1inQb9CML01vbC0uzSZ/view?usp=sharing))

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
  - [Manual Setup](#manual-setup)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
  - [Stake Contract](#stake-contract)
- [Development](#development)
- [License](#license)
- [Contributing](#contributing)
- [Links](#links)

---

## Overview

**DAGSeer** is a modern BlockDAG-based dApp platform for forecasting future events on-chain. Users can stake their predictions (Yes/No) in various markets, earning Seer tokens by joining the winning side. The platform is designed for ease-of-use, security, and scalability, providing both frontend and backend tooling for rapid development and deployment of decentralized forecasting applications.

- Stake with confidence on real-world events
- Transparent, verifiable outcomes
- Earn tokens for correct predictions
- Powered by BlockDAG Primordial network

---

## Features

- **Streamlined Setup**: Create a complete BlockDAG dApp with a single command
- **Modern Stack**: Next.js frontend with Web3 integration
- **Dual Smart Contract Development**: Supports both Hardhat and Foundry environments
- **Production Ready**: Follows best practices for decentralized forecasting
- **Lightweight**: Fast project creation with minimal dependencies
- **Wallet Integration**: Connect, view balance, and manage your positions
- **Market Participation**: Stake Yes/No on supported markets
- **Transparent Payouts**: Automated distribution to winning side

---

## Architecture

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend/Contracts**: Solidity (Hardhat & Foundry)
- **Web3 Integration**: viem, ethers.js
- **Network**: BlockDAG Primordial (`BDAG`)
- **Smart Contract Libraries**: OpenZeppelin Contracts

Directory structure:
```
contracts/
  hardhat/           # Hardhat smart contract environment
  foundry/           # Foundry smart contract environment
frontend/            # Web interface (Next.js)
```

---

## Technologies Used

- **Solidity**: Core smart contract language
- **Next.js**: Modern React-based frontend
- **Hardhat / Foundry**: Dual smart contract development frameworks
- **OpenZeppelin**: Secure and vetted contract libraries
- **viem**: Web3 client for frontend dApp interaction
- **TypeScript**: Type safety throughout the app

---

## Getting Started

### Quick Start

Use the BlockDAG starter CLI:

```bash
npx create-blockdag-dapp@latest
```

This launches an interactive prompt to scaffold a new BlockDAG-based dApp.

### Manual Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/scryptwiz/Dagseer.git
   cd Dagseer
   ```

2. **Install dependencies:**
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Contracts (Hardhat & Foundry):
     ```bash
     cd contracts/hardhat
     npm install

     # Foundry installation (if not installed)
     curl -L https://foundry.paradigm.xyz | bash
     foundryup
     ```

3. **Configure BlockDAG RPC:**
   - Frontend uses the BlockDAG Primordial network:
     - RPC: `https://rpc.primordial.bdagscan.com`
     - Explorer: `https://primordial.bdagscan.com`

---

## Usage

- **Connect Wallet**: Use the "Connect" button on the homepage to attach your wallet. Supported chains are pre-configured for BlockDAG.
- **View Markets**: Browse open prediction markets and stake your position (Yes/No).
- **Manage Positions**: View your open/won/lost positions in "My Positions".
- **Withdraw Winnings**: Winners are paid out automatically based on smart contract logic.

---

## Smart Contracts

### Stake Contract

Main contract: `DagSeerStake.sol`

- Allows users to stake tokens on a market (`Yes` or `No`).
- Secure staking via `ReentrancyGuard`.
- Emits `StakePlaced` and `WinningsDistributed` events for transparency.
- Payouts are automated for the winning side.

Example deployment (Hardhat):

```typescript
import { ethers } from "hardhat";
async function main() {
  const [deployer] = await ethers.getSigners();
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello BlockDAG!");
  await greeter.waitForDeployment();
  console.log("Greeter deployed to:", await greeter.getAddress());
}
main().then(() => process.exit(0)).catch(console.error);
```

---

## Development

- **Frontend**: Located in `/frontend`. Built with Next.js and React.
- **Smart Contracts**: Dual environment in `/contracts/hardhat` and `/contracts/foundry`.
- **Testing**: Use Hardhat or Foundry for contract tests. Example files and scripts provided.

---

## License

This project is licensed under the [Apache License 2.0](https://github.com/scryptwiz/Dagseer/blob/main/LICENSE).

---

## Contributing

Contributions welcome! Please open issues and pull requests for bugfixes, features, or documentation updates.

---

## Links

- [Live App](https://dagseer.vercel.app)
- [BlockDAG Primordial Explorer](https://primordial.bdagscan.com)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Next.js Documentation](https://nextjs.org/docs)
- [Foundry Book](https://book.getfoundry.sh/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)

---

<div align="center">
  <img width="400px" src="https://blockdag.network/images/presskit/Logo.svg" alt="BlockDAG" />
  <br />
  <strong>DAGSeer: Forecast the Future, On-Chain</strong>
</div>
