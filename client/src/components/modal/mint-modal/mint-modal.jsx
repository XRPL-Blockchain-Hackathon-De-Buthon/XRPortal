import React from "react";
import { BackgroundContainer, ModalContentContainer } from "../modal.style";
import {
  ConfirmContainer,
  MintModalContainer,
  PriceContainer,
} from "./mint-modal.style";

const MintModal = ({ closeMintModal }) => {
  return (
    <BackgroundContainer
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMintModal();
      }}
    >
      <ModalContentContainer width={450}>
        <MintModalContainer>
          <h2>게시글 구매</h2>
          <PriceContainer>
            <span className="title">Price</span>
            <span className="price">3 XRP</span>
          </PriceContainer>
          <ConfirmContainer>
            <span>구매를 진행하시겠습니까?</span>
            <div className="buttonContainer">
              <button
                onClick={() => {
                  closeMintModal();
                }}
                className="cancel"
              >
                Cancel
              </button>
              <button className="minting">Minting</button>
            </div>
          </ConfirmContainer>
        </MintModalContainer>
      </ModalContentContainer>
    </BackgroundContainer>
  );
};

export default MintModal;
