import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { celoAlfajores } from "@reown/appkit/networks";
import useContractInstance from "./useContractInstance";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useBuyAsset = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (id) => {
      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(celoAlfajores.id)) {
        toast.error("You're not connected to celoAlfajores");
        return;
      }

      try {
        console.log("Starting transaction for asset ID:", id);
        const estimatedGas = await contract.buyAsset.estimateGas(id);
        console.log("Estimated Gas:", estimatedGas.toString());

        const tx = await contract.buyAsset(id, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
          toast.success("Asset Purchased successfully");
        } else {
          toast.error("Failed to purchase asset");
        }
      } catch (error) {
        console.error("Error from purchasing asset", error);
        toast.error("An error occurred while purchasing the asset.");
      }
    },
    [contract, address, chainId]
  );
};

export default useBuyAsset;
