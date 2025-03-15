import React from "react";
import styled from "styled-components";
import Input from "../Input";
import ImageUploader from "../ImageUploader";
import { Product } from "../../api/axios";

const FileImageUploader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  margin-top: 30px;
`;

interface ProductProps {
  product: Product;
  index: number;
  onProductChange: (
    index: number,
    field: keyof Product,
    value: string | number,
  ) => void;
}

const ProductFrom: React.FC<ProductProps> = ({
  product,
  index,
  onProductChange,
}) => {
  const handleImageUpload = (newImageUrl: string) => {
    onProductChange(index, "imageUrl", newImageUrl);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProductChange(index, "name", e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProductChange(index, "price", Number(e.target.value));
  };

  return (
    <>
      <FileImageUploader>
        <ImageUploader
          imageUrl={product.imageUrl}
          onImageUpload={handleImageUpload}
        />
      </FileImageUploader>

      <FormSection>
        <Input
          label="상품 이름"
          type="common"
          placeholder="상품 이름을 입력해 주세요."
          value={product.name}
          onChange={handleNameChange}
        />
      </FormSection>

      <FormSection>
        <Input
          label="상품 가격"
          type="number"
          placeholder="원화로 표기해주세요."
          value={product.price}
          onChange={handlePriceChange}
        />
      </FormSection>
    </>
  );
};

export default ProductFrom;
