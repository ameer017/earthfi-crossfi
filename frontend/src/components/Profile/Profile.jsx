import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTxn } from "../../context/txnContext";

const Profile = ({ address }) => {
  const { isConnected } = useAppKitAccount();
  const {
    transactions,
    buyBalance,
    getUserTransactions,
    getBuyBalance,
    getSellBalance,
    sellBalance,
  } = useTxn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      await getUserTransactions(address);
      setLoading(false);
    };

    const fetchBuyBalance = async () => {
      setLoading(true);
      await getBuyBalance();
      setLoading(false);
    };
    const fetchSellBalance = async () => {
      setLoading(true);
      await getSellBalance();
      setLoading(false);
    };

    if (address) {
      fetchTransactions();
      fetchBuyBalance();
      fetchSellBalance();
    }
  }, [address, getUserTransactions]);

  if (transactions.length === 0) {
    return (
      <div className="h-[45vh] flex items-center justify-center">
        <p className="font-bold text-[18px] text-red-700 ">
          {" "}
          No transactions found.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[45vh] flex items-center justify-center">
        <p className="font-bold text-[18px] text-green-700 ">loading....</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8 border-2 ">
      <div className="flex items-center space-x-4 mb-8  ">
        <img
          src="/earth.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-green-400"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800 hidden md:block ">
            {address ? address : "Wallet Not Connected"}
          </h1>
          <h1 className="text-xl font-bold text-gray-800 md:hidden ">
            {address
              ? address.length > 10
                ? `${address.slice(0, 6)}...${address.slice(-6)}`
                : address
              : "Wallet Not Connected"}
          </h1>
        </div>
      </div>

      {isConnected ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 h-full">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-blue-600">Balances</h2>
              <p className="mt-2">
                Buy Balance:{" "}
                <span className="font-bold text-gray-700">{buyBalance}</span>
              </p>
              <p>
                Sell Balance:{" "}
                <span className="font-bold text-gray-700">{sellBalance}</span>
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-green-600">
                Total Transactions
              </h2>
              <p className="mt-2">
                {transactions.map((txn, index) => (
                  <div key={index}>
                    <p>
                      Total Amount:{" "}
                      <span className="font-bold text-gray-700 text-[20px] ">
                        {" "}
                        {txn.amount}
                      </span>
                    </p>
                  </div>
                ))}
              </p>
            </div>
          </div>

          {/* <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                All Transactions
              </h2>
              <ul className="bg-gray-50 border rounded-lg p-4 shadow-inner max-h-40 overflow-y-auto">
                {Array.isArray(allTxns) && allTxns.length > 0 ? (
                  allTxns.map((txn, index) => (
                    <li
                      key={index}
                      className="border-b py-2 px-3 text-gray-700"
                    >
                      {txn}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No transactions found.</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Buy Transactions
              </h2>
              <ul className="bg-gray-50 border rounded-lg p-4 shadow-inner max-h-40 overflow-y-auto">
                {Array.isArray(buyTxns) && buyTxns.length > 0 ? (
                  buyTxns.map((txn, index) => (
                    <li
                      key={index}
                      className="border-b py-2 px-3 text-gray-700"
                    >
                      {txn}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No buy transactions found.</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sell Transactions
              </h2>
              <ul className="bg-gray-50 border rounded-lg p-4 shadow-inner max-h-40 overflow-y-auto">
                {Array.isArray(sellTxns) && sellTxns.length > 0 ? (
                  sellTxns.map((txn, index) => (
                    <li
                      key={index}
                      className="border-b py-2 px-3 text-gray-700"
                    >
                      {txn}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No sell transactions found.</li>
                )}
              </ul>
            </div>
          </div> */}
        </>
      ) : (
        <p>Connect Wallet to View balances</p>
      )}
    </div>
  );
};

export default Profile;
