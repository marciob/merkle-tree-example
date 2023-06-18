require("dotenv").config({ path: ".env" });
const hre = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");

async function main() {
  const _merkleRoot =
    "0x8c19a42cbfa9f822c790607dfd4b95bfc0437015503da01a6cab77e8079ec63d";

  const VerifierFactory = await hre.ethers.deployContract("Verifier", [
    _merkleRoot,
  ]);

  await VerifierFactory.waitForDeployment();

  console.log(`VerifierFactory deployed to ${VerifierFactory.target}`);

  console.log("Waiting for Etherscan verification.....");
  // Wait for Etherscan to notice that the contract has been deployed
  await sleep(10000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: VerifierFactory.target,
    constructorArguments: [_merkleRoot],
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
// npx hardhat run scripts/deployVerifier.js --network mumbai
// npx hardhat verify --network mumbai <contractAddress> “Lisbon” “LBS”
// npx hardhat verify --contract contracts/Lisbon.sol:Lisbon --network mumbai 0x9C1046f49413FFAaca13c7d709b3e8e8e7A0D909
