import styled from '@emotion/styled'

export const MintModalContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
  

  h2 {
    color: #DDDDDD;
    font-size: 20px;
    font-weight: bold;
    align-self: flex-start;
  }
`

export const PriceContainer = styled.div`
  width: 350px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);

  .title {
    font-size: 14px;
    position: absolute;
    top: 8px;
    left: 12px;
    color: #ddd;
  }

  .price {
    font-size: 20px;
    font-weight: bold;
    color: #28A745;
    
    padding-bottom: 1px;
    border-bottom: 1px solid #28A745;
  }
`

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;

  span {
    font-weight: bold;
    font-size: 12px;
    color: #DDDDDD;
  }

    .buttonContainer {
      display: flex;
      column-gap: 12px;
      
      button {
        outline: none;
        padding: 12px;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        border-radius: 8px;
        border: none;
      }

      .cancel {
        background-color: rgba(255,255,255,0.05);

        border: 1px solid rgba(255,255,255,0.1);
      }

      .minting {
        background-image: linear-gradient(to right, #7B43E6, #AE5DFD);
      }
    }
`