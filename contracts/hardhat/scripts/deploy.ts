import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "BDAG");

  // Deploy the token
  const SEERToken = await ethers.getContractFactory("DAGSToken");
  const token = await SEERToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DAGSToken deployed to:", tokenAddress);

  // Deploy Stake contract with token address
  const Stake = await ethers.getContractFactory("Stake");
  const stake = await Stake.deploy(tokenAddress);
  await stake.waitForDeployment();
  const stakeAddress = await stake.getAddress();
  console.log("Stake deployed to:", stakeAddress);
}

main()
  .then(() => console.log("Deployment successful"))
  .catch((error) => {
    console.error(error);
  });
