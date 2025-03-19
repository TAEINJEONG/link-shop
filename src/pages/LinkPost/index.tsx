import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import api, { LinkShopData } from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ImageUploader from "../../components/ImageUploader";
import ProductForm from "../../components/ProductForm";
import Popup from "../../components/Popup";
import * as styles from "./index.styles";
import LogoImage from "../../assets/images/logo.svg";

/**
 * 기본 폼 데이터 타입 (생성 시 사용할 데이터 구조)
 */
interface ShopData {
  shop: {
    imageUrl: string;
    urlName: string;
    shopUrl: string;
  };
  products: {
    id: string;
    price: number | string;
    imageUrl: string;
    name: string;
  }[];
  password?: string; // 생성 모드 사용
  currentPassword?: string; // 수정 모드 사용
  userId: string;
  name: string;
}

/**
 * GET API 응답 타입 (추가 필드 포함)
 */
interface ShopResponse extends ShopData {
  id: number;
  likes: number;
  teamId: string;
  _count: { products: number };
  shop: ShopResponseShop;
  products: ShopResponseProduct[];
}

interface ShopResponseShop {
  id: number;
  linkShopId: number;
  imageUrl: string;
  urlName: string;
  shopUrl: string;
}

interface ShopResponseProduct {
  id: string;
  price: number | string;
  imageUrl: string;
  name: string;
  linkShopId: number;
}

/**
 * PUT 요청에 사용할 데이터 타입: GET 응답의 불필요한 필드를 제거
 */
type PutShopData = Omit<
  ShopResponse,
  "id" | "likes" | "teamId" | "_count" | "shop" | "products"
> & {
  shop: Omit<ShopResponseShop, "id" | "linkShopId">;
  products: Omit<ShopResponseProduct, "id" | "linkShopId">[];
};

const sanitizeShopData = (
  data: ShopResponse,
  isEditMode: boolean,
): PutShopData => {
  // data에서 id, likes, teamId, _count, shop, products 필드를 분리합니다.
  // 나머지 필드에는 password와 currentPassword 등이 포함됩니다.
  const { id, likes, teamId, _count, shop, products, ...restWithoutShop } =
    data;

  // 생성 모드일 경우, currentPassword는 필요 없으므로 제거합니다.
  const cleanRest = isEditMode
    ? restWithoutShop
    : (({ currentPassword, ...rest }) => rest)(restWithoutShop);

  // shop 객체에서 id와 linkShopId를 제거합니다.
  const { id: shopId, linkShopId, ...cleanShop } = shop;

  // 각 product에서 id와 linkShopId를 제거하고, price를 숫자로 변환합니다.
  const cleanProducts: Array<Omit<ShopResponseProduct, "id" | "linkShopId">> =
    products.map(({ id, linkShopId, ...product }) => ({
      ...product,
      price:
        typeof product.price === "string"
          ? product.price.trim() === ""
            ? 0
            : Number(product.price)
          : product.price,
    }));

  return {
    ...cleanRest,
    shop: cleanShop,
    products: cleanProducts,
  };
};

const LinkShopForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // id가 있으면 수정 모드, 없으면 생성 모드
  const isEditMode = Boolean(id);

  /**
   * 초기 상태는 생성 시 사용할 값에 GET 응답의 필드들을 포함할 기본값을 설정합니다.
   * 수정 모드에서는 GET API를 통해 전체 데이터를 받아오게 됩니다.
   */
  const [shopData, setShopData] = useState<ShopResponse>({
    id: 0,
    likes: 0,
    teamId: "",
    _count: { products: 0 },
    shop: {
      id: 0,
      linkShopId: 0,
      imageUrl: "",
      urlName: "",
      shopUrl: "",
    },
    products: [
      {
        id: `product-${Date.now()}`,
        price: "",
        imageUrl: "",
        name: "",
        linkShopId: 0,
      },
    ],
    userId: "",
    name: "",
    password: "", // 생성 모드 사용
    currentPassword: "", // 수정 모드 사용
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {},
  );

  // 편집 모드일 경우, 기존 데이터를 GET API로 받아옴
  const fetchShopData = useCallback(async () => {
    if (isEditMode && id) {
      try {
        const res = await api.getLinkShopById("13-2", id);
        setShopData(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  // 공통 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));

    setShopData((prevData) => {
      // shop 객체의 필드일 경우
      if (["imageUrl", "urlName", "shopUrl"].includes(name)) {
        return {
          ...prevData,
          shop: {
            ...prevData.shop,
            [name]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
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
    const newProduct = {
      id: `product-${Date.now()}`,
      price: "",
      imageUrl: "",
      name: "",
      linkShopId: 0,
    };
    setShopData((prevData) => ({
      ...prevData,
      products: [...prevData.products, newProduct],
    }));
  };

  const handleProductChange = (
    index: number,
    field: keyof (typeof shopData.products)[0],
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

  const handleDeleteProduct = (productId: string) => {
    if (shopData.products[0].id === productId) return;
    setShopData((prevData) => ({
      ...prevData,
      products: prevData.products.filter((product) => product.id !== productId),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditMode) {
        // 수정 모드: GET 응답 데이터를 정제하여 PUT 요청
        const cleanData = sanitizeShopData(shopData, isEditMode);
        response = await api.putLinkShop(
          "13-2",
          Number(id),
          cleanData as unknown as LinkShopData,
        );
      } else {
        // 생성 모드: 정제한 데이터를 POST 요청
        const cleanData = sanitizeShopData(shopData, isEditMode);
        response = await api.postLinkShop(
          "13-2",
          cleanData as unknown as LinkShopData,
        );
      }

      if (response.data?.id) {
        setLinkId(String(response.data.id));
      }
      setPopupVisible(true);
    } catch (e: any) {
      const errors: { [key: string]: string } = {};
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

      if (isEditMode) {
        if (
          e.response?.data?.details?.["requestBody.currentPassword"]
            ?.message === "minLength 6"
        ) {
          errors.currentPassword = "6자리 이상 입력해주세요.";
        } else if (
          e.response?.data?.details?.name?.message ===
          "비밀번호가 일치하지 않습니다."
        ) {
          errors.currentPassword = "비밀번호가 일치하지 않습니다.";
        }
      } else {
        if (
          e.response.data.details?.["requestBody.password"]?.message ===
          "minLength 6"
        ) {
          errors.password = "6자리 이상 입력해주세요.";
        }
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

  // 폼 유효성 검사
  const isFormValid =
    shopData.shop.imageUrl !== "" &&
    shopData.products.every(
      (product) =>
        product.name !== "" && product.price !== "" && product.imageUrl !== "",
    ) &&
    shopData.name !== "" &&
    shopData.userId !== "" &&
    ((isEditMode && shopData.currentPassword) ||
      (!isEditMode && shopData.password));

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
          imageUrl={shopData.shop.imageUrl}
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
            name={isEditMode ? "currentPassword" : "password"}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={isEditMode ? shopData.currentPassword! : shopData.password!}
            onChange={handleChange}
            errorMessage={
              isEditMode ? errorMessage.currentPassword : errorMessage.password
            }
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
          {isSubmitting
            ? isEditMode
              ? "수정 중..."
              : "생성 중..."
            : isEditMode
              ? "수정하기"
              : "생성하기"}
        </Button>
      </styles.ButtonContainer>

      {popupVisible && (
        <Popup type="confirm" handleNavigate={handleNavigate}>
          {isEditMode ? "수정되었습니다." : "등록되었습니다."}
        </Popup>
      )}
    </styles.LinkPostContainer>
  );
};

export default LinkShopForm;
