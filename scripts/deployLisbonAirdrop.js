const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomicfoundation/hardhat-toolbox");

async function main() {
  const _token = "0x9C1046f49413FFAaca13c7d709b3e8e8e7A0D909";
  const _merkleRoot =
    "0x6bb79082f597fa03a9343f7cf2495a18b91e03c3b830e85a380795b2757c0534";

  const LisbonAirdropFactory = await hre.ethers.deployContract(
    "LisbonAirdrop",
    [_token, _merkleRoot]
  );

  await LisbonAirdropFactory.waitForDeployment();

  console.log(
    `LisbonAirdropFactory deployed to ${LisbonAirdropFactory.target}`
  );

  console.log("Waiting for Etherscan verification.....");
  // Wait for Etherscan to notice that the contract has been deployed
  await sleep(10000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: LisbonAirdropFactory.target,
    constructorArguments: [_token, _merkleRoot],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Use with:
// npx hardhat run scripts/deploy.js --network mumbai
// npx hardhat verify --network mumbai <contractAddress> “Lisbon” “LBS”
// npx hardhat verify --contract contracts/Lisbon.sol:Lisbon --network mumbai 0x9C1046f49413FFAaca13c7d709b3e8e8e7A0D909
