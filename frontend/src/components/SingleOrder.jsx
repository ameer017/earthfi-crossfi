import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAsset } from "../context/assetContext";
import useBuyAsset from "../hooks/useBuyAsset";
import useConfirmBuyAsset from "../hooks/useConfirmBuy";
import useApproveToken from "../hooks/useApproveToken";
import { toast } from "react-toastify";

const SingleOrder = () => {
  const { id } = useParams();
  const { asset, getSingleAsset } = useAsset();
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const buy = useBuyAsset();
  const confirmBuy = useConfirmBuyAsset();
  const approveToken = useApproveToken();

  useEffect(() => {
    const fetchSingleAsset = async () => {
      setLoading(true);
      await getSingleAsset(id);
      setLoading(false);
    };

    fetchSingleAsset();
  }, [id, getSingleAsset]);

  const handleApproveAsset = async () => {
    try {
      setLoading(true);
      await approveToken(
        import.meta.env.VITE_EARTHFI_CONTRACT_ADDRESS,
        asset.amount
      );
      setIsApproved(true);
      toast.success("Approval successful!");
    } catch (error) {
      console.error("Error approving asset:", error);
      toast.error("Approval failed. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyAsset = async () => {
    try {
      setLoading(true);
      await buy(id);
      setPurchaseComplete(true);
    } catch (error) {
      console.error("Error buying asset:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBuyAsset = async () => {
    try {
      setLoading(true);
      await confirmBuy(id);
      toast.success("Purchase confirmed!");
    } catch (error) {
      console.error("Error confirming purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!asset) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Asset {id} not found</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const { title, location, amount, weight, file, seller, available } = asset;

  return (
    <section className="p-6 lg:p-12 h-full">
      <div className="bg-gradient-to-r from-green-200 via-green-400 to-white p-8 rounded-lg text-center mb-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-black">{title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img
            src={file}
            alt={title}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Product Details</h2>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Price:</strong> {amount} EFI
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Weight:</strong> {weight} kg
          </p>
          {/* <p className="text-gray-700 text-lg mb-4">
            <strong>Weight:</strong> {seller} kg
          </p> */}

          <div className="mt-8">
            {asset?.available ? (
              !isApproved ? (
                <button
                  className="bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-yellow-700 transition duration-300"
                  onClick={handleApproveAsset}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Approve"}
                </button>
              ) : !purchaseComplete ? (
                <button
                  className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300"
                  onClick={handleBuyAsset}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Order Now"}
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
                  onClick={handleConfirmBuyAsset}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm Receipt"}
                </button>
              )
            ) : (
              <button
                className="bg-gray-400 text-white py-3 px-6 rounded-lg text-lg cursor-not-allowed"
                disabled
              >
                This asset is no longer available for sale
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/market-place"
          className="text-blue-600 hover:text-blue-800 underline text-lg"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </section>
  );
};

export default SingleOrder;
