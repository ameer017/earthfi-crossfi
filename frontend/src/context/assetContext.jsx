import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useContractInstance from "../hooks/useContractInstance";

const AssetContext = createContext({
  assets: [],
});

export const AssetContextProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  const readOnlyAssetContract = useContractInstance();

  const getAssets = useCallback(async () => {
    if (!readOnlyAssetContract) return;

    try {
      const data = await readOnlyAssetContract.getAllProducts();
      // console.log(data)
      const formattedData = data.map((asset) => ({
        assetId: Number(asset.assetId),
        title: asset.title,
        location: asset.location,
        weight: Number(asset.weight),
        amount: Number(asset.amount),
        available: asset.available,
        file: asset.fileUrls[0],
      }));

      // console.log(formattedTodos)
      setAssets(formattedData);
      console.log(assets);
    } catch (error) {
      console.log("Error fetching assets", error);
    }
  }, [readOnlyAssetContract]);

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  return (
    <AssetContext.Provider value={{ assets }}>{children}</AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  return context;
};
