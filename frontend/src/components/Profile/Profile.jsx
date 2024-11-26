import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTxn } from "../../context/txnContext";

const Profile = ({ address }) => {
  const { isConnected } = useAppKitAccount();
  const [totalAmount, setTotalAmount] = useState(0);
  const {
    transactions,

    getUserTransactions,
  } = useTxn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (transactions.length > 0) {
      const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);
      setTotalAmount(total);
    }
  }, [transactions]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      await getUserTransactions(address);
      setLoading(false);
    };

    if (address) {
      fetchTransactions();
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
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm ">
            <h2 className="text-xl font-semibold text-green-600">
              Total Transactions
            </h2>
            <p className="mt-2">
              <div>
                <p>
                  Total Amount:{" "}
                  <span className="font-bold text-gray-700 text-[20px] ">
                    {" "}
                    {totalAmount}
                  </span>
                </p>
              </div>
            </p>
          </div>
        </>
      ) : (
        <p>Connect Wallet to View balances</p>
      )}
    </div>
  );
};

export default Profile;
