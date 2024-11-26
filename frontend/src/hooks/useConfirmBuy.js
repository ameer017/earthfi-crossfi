import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { celoAlfajores } from "@reown/appkit/networks";
import useContractInstance from "./useContractInstance";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useConfirmBuyAsset = () => {
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
        const estimatedGas = await contract.confirmReceipt.estimateGas(id);

        const tx = await contract.confirmReceipt(id, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Asset Purchased successfully");
          return;
        }

        toast.error("Failed to purchase asset");
        return;
      } catch (error) {
        console.error("Error from purchasing asset", error);
      }
    },
    [contract, address, chainId]
  );
};

export default useConfirmBuyAsset;
