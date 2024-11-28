import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
// import { celoAlfajores } from "@reown/appkit/networks";
import { BrowserProvider, Contract } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useContractInstance from "./useContractInstance";

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
        console.error("Contract is null or undefined");
        toast.error("Contract not initialized properly");
        return;
      }

      console.log(contract)

      if (!contract.target) {
        console.error("Contract address is missing");
        toast.error("Contract address is not defined");
        return;
      }

      if (!id) {
        console.error("Invalid asset ID:", id);
        toast.error("Asset ID is invalid");
        return;
      }

      // if (Number(chainId) !== Number(celoAlfajores.id)) {
      //   toast.error("You're not connected to celoAlfajores");
      //   return;
      // }

      if (!window.ethereum) {
        toast.error("MetaMask is not installed. Please install it to proceed.");
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("Contract address:", contract.target);
        console.log("Attempting to purchase asset ID:", id);

        let gasLimit;
        try {
          const estimatedGas = await contract.buyAsset.estimateGas(id);
          gasLimit = (estimatedGas * BigInt(120)) / BigInt(100);
        } catch (gasError) {
          console.warn("Gas estimation failed, using fallback gas limit");
          gasLimit = BigInt(500000);
        }

        // Execute the transaction
        const tx = await contract.buyAsset(id, { gasLimit });
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
          toast.success("Asset purchased successfully");
        } else {
          toast.error("Failed to purchase asset");
        }
      } catch (error) {
        console.error("Error from purchasing asset", error);

        // Provide specific error messages
        if (error.code === "INVALID_ARGUMENT") {
          toast.error(
            "Invalid contract address or arguments. Please verify inputs."
          );
        } else {
          toast.error("An error occurred while purchasing the asset.");
        }
      }
    },
    [contract, address, chainId]
  );
};

export default useBuyAsset;
