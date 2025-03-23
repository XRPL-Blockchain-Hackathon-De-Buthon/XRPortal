import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import {
  BackBtn,
  CreateArticlePageContainer,
  Header,
  MintingDescription,
  MintingInputContainer,
  TextInput,
  WriteBtn,
} from "./create-article.style";
import MarkdownPreview from "../../components/markdown-preview/markdown-preview";
import useUserStore from "../../store/auth";
import { $api } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../../store/wallet";
import { mintNFT } from "../../utils/wallet";
import { Wallet } from 'xrpl';

const CreateArticlePage = () => {
  // WRITE, MINTING
  const [step, setStep] = useState("WRITE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gasFee, setGasFee] = useState(0.01);
  const { user } = useUserStore();
  const { wallet, client } = useWalletStore();
  const navigate = useNavigate();

  const onSubmitWrite = () => {
    if (!content) return;

    //TODO: 예상 gas_fee 받기
    setGasFee(0.01);

    setStep("MINTING");
  };

  const onSubmitMinting = async () => {
    if (!content || !user) return;
    console.log("Minting...");

    try {
      const newWallet = await Wallet.fromSeed(wallet.seed);
      const mintResponse = await mintNFT(
        client,
        newWallet,
        1,
        title,
        content,
        "",
        []
      );

      const response = await $api.post("/posts/create", {
        post_title: title,
        post_content: content,
        gas_fee: gasFee,
        writer_id: user.id,
      });

      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout isSidebar={false} width={800}>
      {step === "WRITE" && (
        <CreateArticlePageContainer>
          <div>
            <Header>Give it a title...</Header>
            <TextInput
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline={true}
              placeholder="What's on your mind? (Markdown supported)"
            ></TextInput>
            <MarkdownPreview height={200} markdown={content} />
            <WriteBtn onClick={() => onSubmitWrite()}>Write</WriteBtn>
          </div>
        </CreateArticlePageContainer>
      )}
      {step === "MINTING" && (
        <CreateArticlePageContainer>
          <div>
            <Header>XRPL을 활용한 블로그의 미래</Header>
            <MintingDescription>
              XRPL을 활용한 블로그는 빠른 트랜잭션과 낮은 비용으로 운영될 수
              있습니다.
              <br /> 또한, 콘텐츠 제작자에게 직접 보상을 지급하는 것이
              가능합니다.
            </MintingDescription>
            <MintingInputContainer>
              <h2>컨텐츠 민팅하기</h2>
              <span>{gasFee} XRP</span>
            </MintingInputContainer>
            <div>
              <BackBtn
                onClick={() => {
                  setStep("WRITE");
                }}
              >
                Back
              </BackBtn>
              <WriteBtn onClick={() => onSubmitMinting()}>Minting</WriteBtn>
            </div>
          </div>
        </CreateArticlePageContainer>
      )}
    </MainLayout>
  );
};

export default CreateArticlePage;
