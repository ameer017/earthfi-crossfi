// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EFIModule = buildModule("EFIModule", (m) => {
    const efi = m.contract("EFI", ["EarthFi", "EFI"]);

    return { efi };
});

export default EFIModule;
