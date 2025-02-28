import React, { useRef, useState } from "react";
import Button from "./Button";
import DeleteIcon from "../assets/images/delete-icon.svg";

import {
  Label,
  ProductDescription,
  FileAddButton,
  FileInput,
  ImgWrapper,
  FileImage,
  StyledDeleteIcon,
  UploaderGroup,
} from "./ImageUploaderStyles";

interface UploadImage {
  file: File;
  thumbnail: string;
  type: string;
}

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);

  const handleClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  const uploadProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      // JS로 파일 형식 더블 체크
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file[0].type)) {
        alert("jpg, jpeg, png 파일만 업로드 가능합니다.");
        return;
      }

      const url = URL.createObjectURL(file[0]);

      setImageFile({
        file: file[0],
        thumbnail: url,
        type: file[0].type,
      });

      // 같은 파일 재선택 가능
      e.target.value = "";
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  return (
    <div>
      <UploaderGroup>
        <Label>상품 대표 이미지</Label>
        <ProductDescription>상품 이미지를 첨부해주세요.</ProductDescription>
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

      {imageFile && (
        <ImgWrapper>
          <FileImage src={imageFile?.thumbnail}></FileImage>
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
