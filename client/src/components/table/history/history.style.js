import styled from '@emotion/styled'

export const HistoryTableContainer = styled.div`
  width: 100%;
  font-size: 14px;
  color: #DDDDDD;

  div:nth-child(even) {
    background-color: rgba(255,255,255,0.03);
  }

  div {
    background-color: #222222;
  }

  .tableHeader{
    font-weight: bold;
    background-color: #252525 !important;
  }
`

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    width: calc(100% / 6);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

`

export const DirectionText = styled.span`
  color: ${(props) => props.isSend ? 'FF6B81' : '2ED573'};
  font-weight: bold;
`