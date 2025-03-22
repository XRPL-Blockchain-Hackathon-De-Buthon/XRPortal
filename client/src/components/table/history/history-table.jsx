import React from 'react';
import { DirectionText, HistoryTableContainer, TableRow } from './history.style';

const HistoryTable = ({data}) => {
  return (
    <HistoryTableContainer>
      <TableRow className="tableHeader">
        <span>Type</span>
        <span>Sender</span>
        <span>Receiver</span>
        <span>Amount</span>
        <span>Direction</span>
        <span>Date</span>
      </TableRow>
      {data.map((v, i) => (
        <TableRow className="tableBody">
          <span>{v.type}</span>
          <span>{v.sender}</span>
          <span>{v.receiver}</span>
          <span>{v.amount}</span>
          <DirectionText isSend={v.isSend}>{v.isSend ? "Sent" : "Received"}</DirectionText>
          <span>{v.date}</span>
        </TableRow>
      ))}
    </HistoryTableContainer>
  );
};

export default HistoryTable;