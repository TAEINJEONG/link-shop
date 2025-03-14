import styled from "styled-components";

export const UploaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.font.caption.sb14.size};
  color: ${({ theme }) => theme.colors.black};
`;

export const ProductDescription = styled.span`
  font-size: ${({ theme }) => theme.font.body.r17.size};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const FileAddButton = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translatey(-50%);
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImgWrapper = styled.div`
  width: 95px;
  height: 95px;
  position: relative;
`;

export const FileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

export const StyledDeleteIcon = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;
