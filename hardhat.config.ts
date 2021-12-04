import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import { getMoralisUrl } from "./moralis.config";
import { chainIds } from "./utils/chainIds";

dotenv.config();

// Ensure that we have all the environment variables we need.
let testPrivateKey: string = process.env.TEST_PRIVATE_KEY || "";
let explorerScanKey: string = process.env.SCAN_API_KEY || "";

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  return {
    chainId: chainIds[network],
    url: getMoralisUrl(network),
    accounts: [`${testPrivateKey}`],
  };
}

interface ConfigWithEtherscan extends HardhatUserConfig {
  // etherscan: { apiKey: string };
}

const config: ConfigWithEtherscan = {
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.9",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        // runs: 800,
        runs: 700,
      },
    },
  },
  abiExporter: {
    flat: true,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: explorerScanKey,
  },
  gasReporter: {
    coinmarketcap: process.env.REPORT_GAS_COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

if (testPrivateKey) {
  config.networks = {
    mainnet: createTestnetConfig("mainnet"),
    rinkeby: createTestnetConfig("rinkeby"),
    polygon: createTestnetConfig("polygon"),
    // mumbai: createTestnetConfig("mumbai"),
    fantom: createTestnetConfig("fantom"),
    // fantom_testnet: createTestnetConfig("fantom_testnet"),
    avax: createTestnetConfig("avax"),
    avax_testnet: createTestnetConfig("avax_testnet"),
  };
}

config.networks = {
  ...config.networks,
  hardhat: {
    chainId: 1337,
  },
};

export default config;
