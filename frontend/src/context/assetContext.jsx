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
  const [asset, setAsset] = useState(null);

  const readOnlyAssetContract = useContractInstance();

  const getAssets = useCallback(async () => {
    if (!readOnlyAssetContract) return;

    try {
      const data = await readOnlyAssetContract.getAllProducts();
      // console.log("Raw data", data)
      const formattedData = data.map((asset) => ({
        id: Number(asset.id),
        title: asset.title,
        location: asset.location,
        weight: Number(asset.weight),
        amount: Number(asset.amount),
        available: asset.available,
        seller: asset.seller,
        file: asset.fileUrl,
      }));

      // console.log(formattedData)
      setAssets(formattedData);
      // console.log(assets);
    } catch (error) {
      console.log("Error fetching assets", error);
    }
  }, [readOnlyAssetContract]);

  const getSingleAsset = useCallback(
    async (id) => {
      try {
        // console.log("Fetching asset with ID:", id);

        // Fetch all products
        const data = await readOnlyAssetContract.getAllProducts();

        // Find the asset with the matching ID
        const asset = data.find((item) => Number(item.id) === Number(id));
        if (!asset) {
          console.log(`Asset with ID ${id} not found.`);
          return null;
        }

        // Format the asset
        const formattedAsset = {
          id: Number(asset.id),
          title: asset.title,
          location: asset.location,
          weight: Number(asset.weight),
          amount: Number(asset.amount),
          available: asset.available,
          file: asset.fileUrl,
        };

        // console.log("Single asset:", formattedAsset);
        setAsset(formattedAsset);
        return formattedAsset;
      } catch (error) {
        console.error("Error fetching single asset:", error);
        return null;
      }
    },
    [readOnlyAssetContract]
  );

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  return (
    <AssetContext.Provider value={{ assets, asset, getSingleAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  return context;
};
