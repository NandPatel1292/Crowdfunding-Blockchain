require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

// require("dotenv").config();
const API_KEY = "4FsTmBz1HxSOqpMVJ-tbSBzhXxRF53P4";
const SEPOLIA_PRIVATE_KEY =
  "42c9fc20576fe91d0b7264586cd47ce1cd34c9a4a7c7c56fd1b851dc1f51b4c0";

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
