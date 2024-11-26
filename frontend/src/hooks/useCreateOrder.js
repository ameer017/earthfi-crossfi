import React, { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { celoAlfajores } from "@reown/appkit/networks";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinataService";
import { useNavigate } from "react-router-dom";

const useCreateOrder = () => {
  const contract = useContractInstance(true);
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const navigate = useNavigate();

  return useCallback(
    async (title, weight, location, amount, file) => {
      if (!title || !weight || !location || !amount || !file) {
        toast.error("Please fill all fields");
        return;
      }
      if (!address || !isConnected) {
        toast.error("Please connect wallet");
        return;
      }
      if (!contract) {
        toast.error("Contract not initialized");
        return;
      }
      if (Number(chainId) !== Number(celoAlfajores.id)) {
        toast.error("Please switch network to Alfajores");
        return;
      }

      try {
        const weightBN = BigInt(weight);
        const amountBN = BigInt(amount);

        toast.info("Uploading file...");
        const fileResponse = await uploadFileToIPFS(file);

        if (!fileResponse.success) {
          throw new Error(fileResponse.message || "File upload failed");
        }

        const fileUrl = fileResponse.pinataURL;

        const metadata = {
          title,
          weight,
          location,
          amount,
          fileUrl,
        };

        toast.info("Uploading metadata to IPFS...");
        const metadataResponse = await uploadJSONToIPFS(metadata);

        if (!metadataResponse.success) {
          toast.error("Failed to upload metadata to IPFS");
          return;
        }

        const metadataHash = metadataResponse.pinataURL;

        toast.info("Estimating gas...");
        const estimatedGas = await contract.listAsset.estimateGas(
          title,
          location,
          weightBN,
          amountBN,
          fileUrl
        );

        const txn = await contract.listAsset(
          title,
          location,
          weightBN,
          amountBN,
          fileUrl,
          {
            gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
          }
        );

        const receipt = await txn.wait();

        if (receipt.status === 1) {
          toast.success("Asset listed successfully");
          console.log("IPFS Metadata Hash:", metadataHash);
          navigate("/market-place");
        } else {
          toast.error("Something went wrong, failed to create");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(`Failed to create order: ${error.message}`);
      }
    },
    [contract, address, isConnected, chainId]
  );
};

export default useCreateOrder;
