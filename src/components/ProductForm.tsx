import styled from "styled-components";
import Input from "../components/input";
import ImageUploader from "../components/ImageUploder";

const FileImageUploader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const ProductFrom = () => {
  return (
    <>
      <FileImageUploader>
        <ImageUploader />
      </FileImageUploader>

      <FormSection>
        <Input
          label={"상품 이름"}
          type={"common"}
          placeholder={"상품 이름을 입력해 주세요."}
        />
      </FormSection>

      <FormSection>
        <Input
          label={"비밀번호"}
          type={"password"}
          placeholder={"아이디를 입력해주세요"}
        />
      </FormSection>
    </>
  );
};

export default ProductFrom;
