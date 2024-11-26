import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useContractInstance from "../hooks/useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";

const TxnContext = createContext({
  transactions: [],
  getUserTransactions: () => {},
});

export const TxnContextProvider = ({ children }) => {
  const { address } = useAppKitAccount();
  const [transactions, setTransactions] = useState([]);

  const readOnlyAssetContract = useContractInstance();

  const getUserTransactions = useCallback(
    async (address) => {
      if (!readOnlyAssetContract) return;

      try {
        const data = await readOnlyAssetContract.getUserAllTransactions(
          address
        );

        // console.log("Raw Data:", data);

        const formattedTransactions = data.map((txn) => ({
          assetId: Number(txn.assetId),
          buyer: txn.buyer,
          seller: txn.seller,
          amount: Number(txn.amount),
          date: new Date(Number(txn.timestamp) * 1000).toLocaleString(),
        }));

        // console.log("Formatted Transactions:", formattedTransactions);

        setTransactions(formattedTransactions);
      } catch (error) {
        console.error(`Error fetching transactions for user ${address}`, error);
      }
    },
    [readOnlyAssetContract]
  );

  useEffect(() => {
    getUserTransactions(address);
  }, [getUserTransactions]);

  return (
    <TxnContext.Provider
      value={{
        transactions,

        getUserTransactions,
      }}
    >
      {children}
    </TxnContext.Provider>
  );
};

export const useTxn = () => {
  const context = useContext(TxnContext);
  return context;
};
