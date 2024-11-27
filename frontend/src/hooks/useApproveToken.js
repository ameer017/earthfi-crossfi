import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { celoAlfajores } from "@reown/appkit/networks";
import { BrowserProvider, Contract } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import EFIABI from "../../ABI/EFI.json";
import useSignerOrProvider from "./useSignerOrProvider";

const useApproveToken = () => {
  const { signer } = useSignerOrProvider();

  const contract = new Contract(
    import.meta.env.VITE_EFI_CONTRACT_ADDRESS,
    EFIABI,
    signer
  );
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (delegateAddress, amount) => {
      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        console.error("Contract is null or undefined");
        toast.error("Contract not initialized properly");
        return;
      }

      if (!contract.target) {
        console.error("Contract address is missing");
        toast.error("Contract address is not defined");
        return;
      }

      if (
        !delegateAddress ||
        delegateAddress === "0x0000000000000000000000000000000000000000"
      ) {
        toast.error("Delegate address cannot be zero");
        return;
      }

      if (Number(chainId) !== Number(celoAlfajores.id)) {
        toast.error("You're not connected to Celo Alfajores");
        return;
      }

      if (!window.ethereum) {
        toast.error("MetaMask is not installed. Please install it to proceed.");
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("Contract address:", contract.target);
        console.log(
          `Approving ${amount} tokens for delegate: ${delegateAddress}`
        );

        let gasLimit;
        try {
          const estimatedGas = await contract.approve.estimateGas(
            delegateAddress,
            amount
          );
          gasLimit = (estimatedGas * BigInt(120)) / BigInt(100); // Adding a buffer
        } catch (gasError) {
          console.warn("Gas estimation failed, using fallback gas limit");
          gasLimit = BigInt(500000);
        }

        // Execute the approval transaction
        const tx = await contract.approve(delegateAddress, amount, {
          gasLimit,
        });
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
          toast.success("Approval successful");
        } else {
          toast.error("Approval transaction failed");
        }
      } catch (error) {
        console.error("Error during token approval:", error);

        if (error.code === "INVALID_ARGUMENT") {
          toast.error(
            "Invalid contract address or arguments. Please verify inputs."
          );
        } else {
          toast.error("An error occurred during the approval process.");
        }
      }
    },
    [contract, address, chainId]
  );
};

export default useApproveToken;
