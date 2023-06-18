// this script works only with ethers version "ethers": "5.x.x" or bellow
// there is an issue with ethers version "ethers": "^6.6.0" and above

const ethers = require("ethers");

const contractABI = require("./AbiLisbonAirdrop.js");

async function main() {
  // replace with your values
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"
  );
  const contractAddress = "0x9d9146CA86F627dD638FACB009cE4b3276bfb421";
  const claimerAddress = "0x2f0b23f53734252bda2277357e97e1517d6b042f";
  const merkleProof = [
    "0x3f1a3f5e1f3735eb310a9387fe5a27671ab40a7056555657b9fbbfe25ab9e038",
    "0xb9ad9726f99e9d62a17ec2ffbce9fd54f5990a99d1cc18171ede1606ddcc3435",
    "0x231df5343e3de6141f7ab7596c7d64cf79a2c2e9a39962e83bdca6782889379d",
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const verify = await contract.verify(merkleProof, claimerAddress);

  console.log("Verification:", verify);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
