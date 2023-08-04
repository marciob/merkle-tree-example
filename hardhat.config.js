require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const ALCHEMY_URL = process.env.ALCHEMY_URL;

// Set your own ALCHEMY_URL in a .env file

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_URL,
      },
    },
  },
  solidity: {
    version: "0.8.9",
  },
};
