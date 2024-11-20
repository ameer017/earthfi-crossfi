import React, { useEffect, useState } from "react";
import formatFunctions from "./Txn";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";


const Profile = () => {
  const { address, isConnected } = useAppKitAccount();

  const [allTxns, setAllTxns] = useState([]);
  const [buyTxns, setBuyTxns] = useState([]);
  const [sellTxns, setSellTxns] = useState([]);
  const [buyBalance, setBuyBalance] = useState(0);
  const [sellBalance, setSellBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { getAllTxns, buyTxns, sellTxns, buybalance, sellbalance } =
          await formatFunctions();

        const allTransactions = (await getAllTxns()) || [];
        const buyTransactions = (await buyTxns()) || [];
        const sellTransactions = (await sellTxns()) || [];
        const balanceBuy = (await buybalance()) || 0;
        const balanceSell = (await sellbalance()) || 0;

        setAllTxns(allTransactions);
        setBuyTxns(buyTransactions);
        setSellTxns(sellTransactions);
        setBuyBalance(balanceBuy);
        setSellBalance(balanceSell);

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <div className="flex items-center space-x-4 mb-8 ">
        <img
          src="/earth.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-green-400"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800 ">
            {address ? address : "Wallet Not Connected"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            Total:{" "}
            <span className="font-bold text-gray-700">{allTxns.length}</span>
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Transactions
          </h2>
          <ul className="bg-gray-50 border rounded-lg p-4 shadow-inner max-h-40 overflow-y-auto">
            {Array.isArray(allTxns) && allTxns.length > 0 ? (
              allTxns.map((txn, index) => (
                <li key={index} className="border-b py-2 px-3 text-gray-700">
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
                <li key={index} className="border-b py-2 px-3 text-gray-700">
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
                <li key={index} className="border-b py-2 px-3 text-gray-700">
                  {txn}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No sell transactions found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
