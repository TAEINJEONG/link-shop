import React from "react";
import styled from "styled-components";
import Input from "../Input";
import ImageUploader from "../ImageUploader";
import { Product } from "../../api/axios";

interface EditProduct {
  id: number | string;
  imageUrl: string;
  linkShopId?: number;
  name: string;
  price: number | string;
}

const FileImageUploader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  margin-top: 30px;
`;

interface ProductProps {
  product: EditProduct;
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

  const formatNumberWithCommas = (value: number | string): string => {
    if (value === "") return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 쉼표 제거
    const rawValue = e.target.value.replace(/,/g, "");
    // 입력값이 빈 문자열이면 빈 문자열을 상태에 반영
    if (rawValue === "") {
      onProductChange(index, "price", "");
      return;
    }
    if (isNaN(Number(rawValue))) return;
    const numericValue = Number(rawValue);
    onProductChange(index, "price", numericValue);
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
          value={formatNumberWithCommas(product.price)}
          onChange={handlePriceChange}
        />
      </FormSection>
    </>
  );
};

export default ProductFrom;
