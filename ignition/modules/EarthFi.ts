// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { vars } from "hardhat/config";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenAddress = vars.get("TOKEN_ADDRESS");

const EarthModule = buildModule("EarthModule", (m) => {
  const earthfi = m.contract("EarthFi", [TokenAddress]);

  return { earthfi };
});

export default EarthModule;
