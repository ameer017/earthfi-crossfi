import React, { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { celoAlfajores } from "@reown/appkit/networks";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinataService";

const useCreateOrder = () => {
  const contract = useContractInstance(true);
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (title, weight, location, amount, files) => {
      if (!title || !weight || !location || !amount || !files) {
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
      if (!Array.isArray(files) || files.length === 0) {
        toast.error("Please upload valid files");
        return;
      }

      try {
        const weightBN = BigInt(weight);
        const amountBN = BigInt(amount);

        toast.info("Uploading files...");
        const fileUrls = await Promise.all(
          files.map(async (file) => {
            const response = await uploadFileToIPFS(file);
            if (response.success) {
              return response.pinataURL;
            } else {
              throw new Error(response.message || "File upload failed");
            }
          })
        );

        
        const metadata = {
          title,
          weight,
          location,
          amount,
          files: fileUrls,
        };

        
        toast.info("Uploading metadata to IPFS...");
        const metadataResponse = await uploadJSONToIPFS(metadata);

        const metadataHash = metadataResponse.pinataURL;

        if (!metadataResponse.success) {
          toast.error("Failed to upload metadata to IPFS");
          return;
        }

        
        toast.info("Estimating gas...");
        const estimatedGas = await contract.listAsset.estimateGas(
          title,
          location,
          weightBN,
          amountBN,
          fileUrls 
        );

        const txn = await contract.listAsset(
          title,
          location,
          weightBN,
          amountBN,
          fileUrls, 
          {
            gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
          }
        );

        const receipt = await txn.wait();

        if (receipt.status === 1) {
          toast.success("Asset listed successfully");
          console.log("IPFS Metadata Hash:", metadataHash);
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
