// from: https://github.com/ethereumvex/SushiMaker-bridge-exploit/blob/master/utils/utils.js
import hre from "hardhat";
import { getMoralisUrl } from "../../moralis.config";
import { chainIds } from "../chainIds";

const ethers = hre.ethers;
require("dotenv").config();

const defaultForkBlock = 9414004; // randomly set

let latest = 0;
export const forkFrom = async (network: keyof typeof chainIds) => {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: getMoralisUrl(network) + "/archive",
          blockNumber: defaultForkBlock,
        },
      },
    ],
  });
};

export const impersonate = async function getImpersonatedSigner(address: any) {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  return ethers.provider.getSigner(address);
};
