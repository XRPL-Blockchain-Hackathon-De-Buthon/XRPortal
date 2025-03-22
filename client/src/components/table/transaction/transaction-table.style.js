import styled from '@emotion/styled'

export const TransactionTableContainer = styled.div`
  width: 100%;
  background-color: #222222;
  font-size: 14px;
  color: #DDDDDD;

  div:nth-child(even) {
    background-color: #252525;
  }

  .tableHeader{
    font-weight: bold;
  }
`

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    width: 25%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

`