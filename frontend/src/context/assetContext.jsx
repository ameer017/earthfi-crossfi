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
  getSingleAsset: () => {},
});

export const AssetContextProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [singleAsset, setSingleAsset] = useState([]);
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
      // console.log(assets);
    } catch (error) {
      console.log("Error fetching assets", error);
    }
  }, [readOnlyAssetContract]);

  const getSingleAsset = useCallback(
    async (id) => {
      if (!readOnlyAssetContract || id === undefined) {
        throw new Error("Contract instance or asset ID is undefined.");
      }
  
      try {
        const data = await readOnlyAssetContract.viewAssetDetail(id);
        const formattedAsset = {
          assetId: id,
          title: data.title_,
          location: data.location_,
          weight: Number(data.weight_),
          amount: Number(data.amount_),
          available: data.available_,
          file: data.fileUrls ? data.fileUrls[0] : null,
        };

        return formattedAsset;
      } catch (error) {
        console.error(`Error fetching asset with id ${id}`, error);
        throw error;
      }
    },
    [readOnlyAssetContract]
  );
  

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  return (
    <AssetContext.Provider value={{ assets, getSingleAsset }}>{children}</AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  return context;
};
