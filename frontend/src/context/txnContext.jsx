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
  generateSellBalance: () => 0,
  generateBuyBalance: () => 0,
});

export const TxnContextProvider = ({ children }) => {
  const { address } = useAppKitAccount();
  const [transactions, setTransactions] = useState([]);
  const [buyBalance, setBuyBalance] = useState(0);
  const [sellBalance, setSellBalance] = useState(0);
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

  const getBuyBalance = useCallback(async () => {
    if (!readOnlyAssetContract) return;

    try {
      const totalAmount = await readOnlyAssetContract.generateBuyBalance();
      setBuyBalance(Number(totalAmount));
    } catch (error) {
      console.error("Error fetching buy balance", error);
    }
  }, [readOnlyAssetContract]);

  const getSellBalance = useCallback(async () => {
    if (!readOnlyAssetContract) return;

    try {
      const totalAmount = await readOnlyAssetContract.generateSellBalance();
      setSellBalance(Number(totalAmount));
    } catch (error) {
      console.error("Error fetching sell balance", error);
    }
  }, [readOnlyAssetContract]);

  useEffect(() => {
    getUserTransactions(address);
  }, [getUserTransactions]);

  return (
    <TxnContext.Provider
      value={{
        transactions,
        buyBalance,
        getUserTransactions,
        getBuyBalance,
        getSellBalance,
        sellBalance,}}
    >
      {children}
    </TxnContext.Provider>
  );
};

export const useTxn = () => {
  const context = useContext(TxnContext);
  return context;
};
