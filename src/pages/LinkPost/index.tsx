import { Link, useNavigate } from "react-router-dom";
import * as styles from "./index.styles";
import LogoImage from "../../assets/images/logo.svg";
import Button from "../../components/Button";
import ProductForm from "../../components/ProductForm";
import ImageUploader from "../../components/ImageUploader";
import Input from "../../components/Input";
import { LinkShopData, Product } from "../../api/axios";
import React, { useState } from "react";
import api from "../../api/axios";
import Popup from "../../components/Popup";

const LinkPost = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState<LinkShopData>({
    shop: {
      imageUrl: "",
      urlName: "",
      shopUrl: "",
    },
    products: [
      {
        id: `product-${Date.now()}`, // 고유 id 부여
        price: "",
        imageUrl: "",
        name: "",
      },
    ],
    password: "",
    userId: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{
    userId?: string;
    shopUrl?: string;
    password?: string;
  }>({});
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [linkId, setLinkId] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({ ...prev, [name]: "" }));

    setShopData((prevData) => {
      if (["imageUrl", "urlName", "shopUrl"].includes(name)) {
        return {
          ...prevData,
          shop: {
            ...prevData.shop,
            [name]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    setShopData((prevData) => ({
      ...prevData,
      shop: {
        ...prevData.shop,
        imageUrl,
      },
    }));
  };

  const handleAddProduct = () => {
    if (shopData.products.length >= 3) return;
    const newProduct: Product = {
      id: `product-${Date.now()}`, // 고유 id 생성 (또는 uuid 라이브러리 사용)
      price: 0,
      imageUrl: "",
      name: "",
    };
    setShopData((prevData) => ({
      ...prevData,
      products: [...prevData.products, newProduct],
    }));
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number,
  ) => {
    setShopData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value,
      };
      return { ...prevData, products: updatedProducts };
    });
  };

  /* 대표 상품 삭제 기능 */
  const handleDeleteProduct = (id: string) => {
    if (shopData.products[0].id === id) return;
    setShopData((prevData) => ({
      ...prevData,
      products: prevData.products.filter((product) => product.id !== id),
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true); // 버튼 비활성화 및 텍스트 변경

      const cleanProducts = shopData.products.map(({ id, ...rest }) => rest);
      const cleanShopData = { ...shopData, products: cleanProducts };

      const response = await api.postLinkShop("13-2", cleanShopData);
      const { id } = response.data;

      if (id) {
        setLinkId(id);
      }

      setPopupVisible(true);
    } catch (e: any) {
      const errors: { userId?: string; shopUrl?: string; password?: string } =
        {};
      if (
        e.response?.data?.details?.name?.message ===
        "이미 존재하는 아이디입니다."
      ) {
        errors.userId = "이 아이디는 이미 사용 중입니다.";
      }

      if (
        e.response.data.details?.["requestBody.shop.shopUrl"]?.message ===
        "Not match in '^https?://.+'"
      ) {
        errors.shopUrl = "올바른 주소를 입력해 주세요.";
      }

      if (
        e.response.data.details?.["requestBody.password"]?.message ===
        "minLength 6"
      ) {
        errors.password = "6자리 이상 입력해주세요.";
      }

      setErrorMessage(errors);
    } finally {
      setIsSubmitting(false); // 제출 완료 후 버튼 상태 복원
    }
  };

  const handleNavigate = () => {
    if (linkId) {
      navigate(`/${linkId}`);
    }
  };

  const isFormValid =
    shopData.shop.imageUrl !== "" &&
    shopData.products.every(
      (product) =>
        product.name !== "" && product.price > 0 && product.imageUrl !== "",
    ) &&
    shopData.name !== "" &&
    shopData.userId !== "" &&
    shopData.password !== "";

  return (
    <styles.LinkPostContainer>
      <styles.HeaderNavigation>
        <Link to="/list">
          <styles.Logo src={LogoImage} alt="로고" />
        </Link>
        <Link to="/list">
          <Button variant="Primary" size="medium">
            돌아가기
          </Button>
        </Link>
      </styles.HeaderNavigation>

      <styles.TopLabel>
        <styles.representativeProduct>대표 상품</styles.representativeProduct>
        <styles.AddProductText onClick={handleAddProduct}>
          추가
        </styles.AddProductText>
      </styles.TopLabel>

      {shopData.products.map((product, index) => (
        <styles.ProductFormContainer key={product.id}>
          <styles.DeleteButton>
            <Button
              variant="Danger"
              size="small"
              width={100}
              onClick={() =>
                product.id && handleDeleteProduct(String(product.id))
              }
            >
              삭제
            </Button>
          </styles.DeleteButton>
          <ProductForm
            product={product}
            index={index}
            onProductChange={handleProductChange}
          />
        </styles.ProductFormContainer>
      ))}

      <styles.TopLabel>
        <styles.representativeProduct>내 쇼핑몰</styles.representativeProduct>
      </styles.TopLabel>
      <styles.ProductFormContainer>
        <ImageUploader
          imageUrl={shopData?.shop?.imageUrl}
          onImageUpload={handleImageUpload}
        />
        <styles.InputContainer>
          <Input
            label="이름"
            type="common"
            name="name"
            placeholder="표시하고 싶은 이름을 적어 주세요"
            value={shopData.name}
            onChange={handleChange}
          />
        </styles.InputContainer>
        <styles.InputContainer>
          <Input
            label="url"
            type="common"
            name="shopUrl"
            placeholder="Url을 입력해주세요"
            value={shopData.shop.shopUrl}
            onChange={handleChange}
            errorMessage={errorMessage.shopUrl}
          />
        </styles.InputContainer>
        <styles.InputContainer>
          <Input
            label="유저 ID"
            type="common"
            name="userId"
            placeholder="유저 ID를 입력해주세요"
            value={shopData.userId}
            onChange={handleChange}
            errorMessage={errorMessage.userId}
          />
        </styles.InputContainer>
        <styles.passwordInputContainer>
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={shopData.password}
            onChange={handleChange}
            errorMessage={errorMessage.password}
          />
        </styles.passwordInputContainer>
      </styles.ProductFormContainer>

      <styles.ButtonContainer>
        <Button
          variant="Primary"
          size="large"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "잠시만 기다려 주세요..." : "생성하기"}
        </Button>
      </styles.ButtonContainer>

      {popupVisible && <Popup type="confirm" handleNavigate={handleNavigate} />}
    </styles.LinkPostContainer>
  );
};

export default LinkPost;
