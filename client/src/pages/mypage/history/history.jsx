import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/main";
import { HeaderContent, HeaderWrapper, HistoryListContainer, Wrapper } from "./history.style";
import HistoryTable from '../../../components/table/history/history-table';

const HISTORY = [
  {
    type: "ENTIRE",
    sender: "user1",
    receiver: "user2222",
    amount: 1000,
    isSend: true,
    date: "2025-03-22",
  },
  {
    type: "CHARGE",
    sender: "system",
    receiver: "user333",
    amount: 5000,
    isSend: false,
    date: "2025-03-21",
  },
  {
    type: "POST",
    sender: "user2222",
    receiver: "user444",
    amount: 1500,
    isSend: true,
    date: "2025-03-20",
  },
  {
    type: "AD",
    sender: "advertiser1",
    receiver: "user555",
    amount: 300,
    isSend: true,
    date: "2025-03-19",
  },
  {
    type: "ENTIRE",
    sender: "user666",
    receiver: "user777",
    amount: 2000,
    isSend: false,
    date: "2025-03-18",
  },
  {
    type: "CHARGE",
    sender: "system",
    receiver: "user888",
    amount: 7500,
    isSend: false,
    date: "2025-03-17",
  },
  {
    type: "POST",
    sender: "user999",
    receiver: "user1010",
    amount: 900,
    isSend: true,
    date: "2025-03-16",
  },
  {
    type: "AD",
    sender: "advertiser2",
    receiver: "user1111",
    amount: 400,
    isSend: true,
    date: "2025-03-15",
  },
  {
    type: "ENTIRE",
    sender: "user1212",
    receiver: "user1313",
    amount: 1200,
    isSend: true,
    date: "2025-03-14",
  },
  {
    type: "POST",
    sender: "user1414",
    receiver: "user1515",
    amount: 1800,
    isSend: false,
    date: "2025-03-13",
  },
  {
    type: "CHARGE",
    sender: "system",
    receiver: "user1616",
    amount: 6500,
    isSend: false,
    date: "2025-03-12",
  },
  {
    type: "AD",
    sender: "advertiser3",
    receiver: "user1717",
    amount: 500,
    isSend: true,
    date: "2025-03-11",
  },
];
const FILTER = ["ENTIRE", "CHARGE", "POST", "AD"];

const HistoryPage = () => {
  // ENTIRE, CHARGE, POST, AD
  const [filter, setFilter] = useState("ENTIRE");
  const [data, setData] = useState(HISTORY)

  useEffect(() => {
    console.log(filter);
    if (filter === 'ENTIRE') {
      setData(HISTORY);
      return;
    }
    setData(HISTORY.filter((v) => v.type === filter));
  }, [filter]);

  return (
    <>
      <MainLayout isSidebar={true}>
        <Wrapper>
          <HeaderWrapper>
            {FILTER.map((v, i) => (
              <HeaderContent
                key={i}
                onClick={() => setFilter(v)}
                isFocus={filter === v}
              >
                {v}
              </HeaderContent>
            ))}
          </HeaderWrapper>
          <HistoryListContainer>
            <HistoryTable data={data} />
          </HistoryListContainer>
        </Wrapper>
      </MainLayout>
    </>
  );
};

export default HistoryPage;
