// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EarthModule = buildModule("EarthModule", (m) => {
  const earthfi = m.contract("EarthFi");

  return { earthfi };
});

export default EarthModule;
