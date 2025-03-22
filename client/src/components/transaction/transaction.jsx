import React, { useEffect, useState } from "react";
import { TransactionContainer } from "./transaction.style";
import TransactionTable from "../table/transaction/transaction-table";
import { $api } from "../../utils/axios";

const TRANSACTION_DATA = [
  {
    seller_id: "user1",
    buyer_id: "user2",
    post_id: 1,
    amount: 100,
    gas_fee: 0,
    date: "2025-03-25",
  },
  {
    seller_id: "user1",
    buyer_id: "user2",
    post_id: 1,
    amount: 100,
    gas_fee: 0,
    date: "2025-03-25",
  },
  {
    seller_id: "user1",
    buyer_id: "user2",
    post_id: 1,
    amount: 100,
    gas_fee: 0,
    date: "2025-03-25",
  },
];

const TransactionComponent = ({ articleId }) => {
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    if (!articleId) return;

    fetchTransaction(articleId);
  }, [articleId]);

  const fetchTransaction = async (articleId) => {
    try {
      const response = await $api.get(`/transactions/post/${articleId}`);
      if (response.data) setTransactionList(response.data);
    } catch (e) {
      setTransactionList(TRANSACTION_DATA);
    }
  };

  return (
    <TransactionContainer>
      <h2>Transcation</h2>
      <TransactionTable data={transactionList} />
    </TransactionContainer>
  );
};

export default TransactionComponent;
