import styled from '@emotion/styled'

export const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContentContainer = styled.div`
  width: ${props => props.width}px;
  padding: 16px 20px;
  background-color: #222222;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
`
