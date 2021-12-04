import dotenv from "dotenv";
import { chainIds } from "./utils/chainIds";

dotenv.config();

const getUrl = (key: string) => {
  const moralisUrl = `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_NODE_KEY}/`;
  return moralisUrl + key;
};

export const getMoralisUrl = (network: keyof typeof chainIds) => {
  switch (chainIds[network]) {
    case 1:
      return getUrl("eth/mainnet");
    case 3:
      return getUrl("eth/ropsten");
    case 4:
      return getUrl("eth/rinkeby");
    case 5:
      return getUrl("eth/goerli");
    case 42:
      return getUrl("eth/kovan");
    case 43114:
      return getUrl("avalanche/mainnet");
    case 43113:
      return getUrl("avalanche/testnet");
    case 250:
      return getUrl("fantom/mainnet");
    case 137:
      return getUrl("polygon/mainnet");

    default:
      throw new Error("Unsupported network " + network);
  }
};
