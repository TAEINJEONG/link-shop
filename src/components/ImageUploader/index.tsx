import React, { useRef } from "react";
import Button from "../Button";
import DeleteIcon from "../../assets/images/delete-icon.svg";

import {
  Label,
  ProductDescription,
  FileAddButton,
  FileInput,
  ImgWrapper,
  FileImage,
  StyledDeleteIcon,
  UploaderGroup,
} from "./index.styles";
import api from "../../api/axios";

interface ImageUploaderProps {
  imageUrl?: string | undefined;
  onImageUpload?: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  const uploadProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file[0].type)) {
        alert("jpg, jpeg, png 파일만 업로드 가능합니다.");
        return;
      }

      // blob URL을 생성하여 미리보기용 상태에 저장
      const blobUrl = URL.createObjectURL(file[0]);
      onImageUpload?.(blobUrl);

      try {
        const formData = new FormData();
        formData.append("image", file[0]);

        const response = await api.uploadFile(formData);
        const uploadedImageUrl = response?.data?.url;

        onImageUpload?.(uploadedImageUrl);
      } catch (error) {
        console.error("파일 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
      }

      e.target.value = "";
    }
  };

  const handleDeleteImage = () => {
    onImageUpload?.("");
  };

  return (
    <div>
      <UploaderGroup>
        <Label>상품 대표 이미지</Label>
        {!imageUrl && (
          <ProductDescription>상품 이미지를 첨부해주세요.</ProductDescription>
        )}
        <FileAddButton>
          <Button
            variant="Secondary"
            size="small"
            onClick={handleClickFileUpload}
          >
            파일 첨부
          </Button>
        </FileAddButton>
      </UploaderGroup>
      <FileInput
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={uploadProductImage}
      />

      {imageUrl && (
        <ImgWrapper>
          <FileImage src={imageUrl}></FileImage>
          <StyledDeleteIcon
            src={DeleteIcon}
            alt="이미지 삭제 아이콘"
            onClick={handleDeleteImage}
          />
        </ImgWrapper>
      )}
    </div>
  );
};

export default ImageUploader;
