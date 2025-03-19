import { Link, useNavigate, useParams } from "react-router-dom";
import * as styles from "../index.styles";
import LogoImage from "../../../assets/images/logo.svg";
import Button from "../../../components/Button";
import ProductForm from "../../../components/ProductForm";
import ImageUploader from "../../../components/ImageUploader";
import Input from "../../../components/Input";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../../api/axios";
import Popup from "../../../components/Popup";

interface EditShop {
  imageUrl: string;
  urlName: string;
  shopUrl: string;
  id: number;
  linkShopId: number;
}

interface EditProduct {
  id: number;
  imageUrl: string;
  linkShopId: number;
  name: string;
  price: number | string;
}

interface _count {
  products: number;
}

interface EditShopData {
  id: number;
  name: string;
  userId: string;
  teamId: string;
  products: EditProduct[];
  currentPassword: string;
  shop: EditShop;
  likes: number;
  _count: _count;
}

const LinkEdit = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [getShopData, setGetShopData] = useState<EditShopData>({
    id: 0,
    name: "",
    userId: "",
    products: [
      {
        id: 0,
        imageUrl: "",
        name: "",
        price: "",
        linkShopId: 0,
      },
    ],
    shop: {
      id: 0,
      shopUrl: "",
      urlName: "",
      imageUrl: "",
      linkShopId: 0,
    },
    likes: 0,
    teamId: "",
    _count: {
      products: 0,
    },
    currentPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{
    userId?: string;
    shopUrl?: string;
    currentPassword?: string;
  }>({});
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [linkId, setLinkId] = useState<string>("");

  const fetchShopData = useCallback(async () => {
    try {
      if (id) {
        const res = await api.getLinkShopById("13-2", id);
        const testShopData = res.data;
        setGetShopData(testShopData);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({ ...prev, [name]: "" }));

    setGetShopData((prevData) => {
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
  }, []);

  const handleImageUpload = (imageUrl: string) => {
    setGetShopData((prevData) => ({
      ...prevData,
      shop: {
        ...prevData.shop,
        imageUrl,
      },
    }));
  };

  const handleAddProduct = () => {
    if (getShopData?.products.length >= 3) return;
    const newProduct: EditProduct = {
      id: 0,
      price: 0,
      imageUrl: "",
      name: "",
      linkShopId: 0,
    };
    setGetShopData((prevData) => ({
      ...prevData,
      products: [...prevData.products, newProduct],
    }));
  };

  const handleProductChange = (
    index: number,
    field: keyof EditProduct,
    value: string | number,
  ) => {
    setGetShopData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value,
      };
      return { ...prevData, products: updatedProducts };
    });
  };

  /* 대표 상품 삭제 기능 */
  const handleDeleteProduct = (id: number) => {
    if (getShopData.products[0].id === id) return;
    setGetShopData((prevData) => ({
      ...prevData,
      products: prevData.products.filter((product) => product.id !== id),
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true); // 버튼 비활성화 및 텍스트 변경
      const {
        id: mainId,
        likes,
        teamId,
        _count,
        ...restShopData
      } = getShopData;

      const cleanProducts = getShopData.products.map(
        ({ id, linkShopId, price, ...rest }) => ({
          ...rest,
          price:
            typeof price === "string"
              ? price.trim() === ""
                ? 0
                : Number(price)
              : price,
        }),
      );

      const { id: shopId, linkShopId, ...cleanShop } = getShopData.shop;

      const cleanShopData = {
        ...restShopData,
        shop: cleanShop,
        products: cleanProducts,
      };

      if (mainId) {
        const response = await api.putLinkShop("13-2", mainId, cleanShopData);

        const { id } = response.data;

        setLinkId(String(id));
      }

      setPopupVisible(true);
    } catch (e: any) {
      const errors: {
        userId?: string;
        shopUrl?: string;
        currentPassword?: string;
      } = {};
      if (
        e.response?.data?.details?.name?.message ===
        "이미 존재하는 아이디입니다."
      ) {
        errors.userId = "이 아이디는 이미 사용 중입니다.";
      }

      if (
        e.response?.data?.details?.name?.message ===
        "이미 존재하는 아이디입니다."
      ) {
        errors.userId = "이 아이디는 이미 사용 중입니다.";
      }

      if (
        e.response?.data?.details?.["requestBody.shop.shopUrl"]?.message ===
        "Not match in '^https?://.+'"
      ) {
        errors.shopUrl = "올바른 주소를 입력해 주세요.";
      }

      if (
        e.response?.data?.details?.["requestBody.currentPassword"]?.message ===
        "minLength 6"
      ) {
        errors.currentPassword = "6자리 이상 입력해주세요.";
      } else if (
        e.response?.data?.details?.name?.message ===
        "비밀번호가 일치하지 않습니다."
      ) {
        errors.currentPassword = "비밀번호가 일치하지 않습니다.";
      }

      setErrorMessage(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = () => {
    if (linkId) {
      navigate(`/${linkId}`);
    }
  };

  const isFormValid =
    getShopData?.shop.imageUrl !== "" &&
    getShopData?.products.every(
      (product) =>
        product.name !== "" && product.price && product.imageUrl !== "",
    ) &&
    getShopData?.name !== "" &&
    getShopData?.userId !== "" &&
    getShopData?.currentPassword;

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

      {getShopData?.products.map((product, index) => (
        <styles.ProductFormContainer key={product.id}>
          <styles.DeleteButton>
            <Button
              variant="Danger"
              size="small"
              width={100}
              onClick={() => handleDeleteProduct(product.id)}
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
          imageUrl={getShopData?.shop?.imageUrl}
          onImageUpload={handleImageUpload}
        />
        <styles.InputContainer>
          <Input
            label="이름"
            type="common"
            name="name"
            placeholder="표시하고 싶은 이름을 적어 주세요"
            value={getShopData?.name}
            onChange={handleChange}
          />
        </styles.InputContainer>
        <styles.InputContainer>
          <Input
            label="url"
            type="common"
            name="shopUrl"
            placeholder="Url을 입력해주세요"
            value={getShopData?.shop.shopUrl}
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
            value={getShopData?.userId}
            onChange={handleChange}
            errorMessage={errorMessage.userId}
          />
        </styles.InputContainer>
        <styles.passwordInputContainer>
          <Input
            label="비밀번호"
            name="currentPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={getShopData?.currentPassword}
            onChange={handleChange}
            errorMessage={errorMessage.currentPassword}
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
          {isSubmitting ? "잠시만 기다려 주세요..." : "수정하기"}
        </Button>
      </styles.ButtonContainer>

      {popupVisible && <Popup type="confirm" handleNavigate={handleNavigate} />}
    </styles.LinkPostContainer>
  );
};

export default LinkEdit;
