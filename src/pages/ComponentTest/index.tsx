// import Input from "../../components/input";
import Button from "../../components/Button";
import ProductFrom from "../../components/ProductForm";
import styled from "styled-components";
import SortListPopup from "../../components/SortListPopup";
import { useCallback, useState } from "react";
import ShopBanner from "../../components/ShopBanner";
import ShopInfo from "../../components/ShopInfo";

interface ShopInfoType {
  shopId: number;
  isLike: boolean;
  likeCount: number;
  shopImage: string | null;
  shopName: string;
  shopHandle: string;
}

const ShopListContainer = styled.div`
  width: 100%;
`;

const ShopList = () => {
  const [sortType, setSortType] = useState<
    "recent" | "likes" | "productsCount"
  >("productsCount");
  const [sortPopupVisible, setSortPopupVisible] = useState<boolean>(false);
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const [shopInfo, setShopInfo] = useState<ShopInfoType>({
    shopId: 1,
    isLike: false,
    likeCount: 0,
    shopImage: null,
    shopName: "독케익의 샤줌",
    shopHandle: "dogcake",
  });
  const [productList] = useState<string[]>([
    "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
    "https://cdn.pixabay.com/photo/2025/02/22/08/35/mountain-9423779_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/06/20/12/26/child-8842052_1280.jpg",
  ]);

  function changeSort(value: "recent" | "likes" | "productsCount") {
    setSortType(value);
  }

  function onClose() {
    if (isBlocking) return; // isBlocking가 false로 바뀌기 전까지 동작을 막음
    setSortPopupVisible(false);
    setIsBlocking(false); // sortPopup가 닫히면 setIsBlocking false로 바꿔서 동작을 다시 수행할 수 있게끔 초기화
  }

  function openSortPopup() {
    setSortPopupVisible(true);
    setIsBlocking(true); // isBlocking가 true로 바로 닫히는걸 방지

    setTimeout(() => {
      // sortPopup을 열었을 경우 바로 안닫히게 400ms 이후에 setIsBlocking false로 바꿈
      setIsBlocking(false);
    }, 400);
  }

  const toggleLike = useCallback(() => {
    setShopInfo((prevShopInfo) => ({
      ...prevShopInfo,
      isLike: !prevShopInfo.isLike,
      likeCount: prevShopInfo.isLike
        ? prevShopInfo.likeCount - 1
        : prevShopInfo.likeCount + 1,
    }));
  }, []);

  return (
    <ShopListContainer>
      <h1>Shop List 입니다.</h1>
      {/* <Input
        label={"비밀번호"}
        type={"password"}
        // placeholder={"아이디를 입력해주세요"}
        // errorMessage={"아이디에 띄어쓰기, 특수기호를 사용할 수 없습니다."}
      /> */}
      <ProductFrom />
      <Button variant="Secondary" size="small">
        버튼이에욤
      </Button>
      <Button variant="Primary" size="medium">
        버튼이에욤
      </Button>
      <Button variant="Primary" disabled size="large">
        버튼이에욤
      </Button>
      <Button variant="Primary" size="large" onClick={openSortPopup}>
        열어
      </Button>
      {sortPopupVisible && (
        <SortListPopup
          active={sortType}
          onClick={changeSort}
          onClose={onClose}
        />
      )}
      <ShopBanner
        shopId={shopInfo.shopId}
        isLike={shopInfo.isLike}
        likeCount={shopInfo.likeCount}
        shopName={shopInfo.shopName}
        shopHandle={shopInfo.shopHandle}
        onClick={toggleLike}
      ></ShopBanner>
      <ShopInfo
        isLike={shopInfo.isLike}
        likeCount={shopInfo.likeCount}
        shopName={shopInfo.shopName}
        shopHandle={shopInfo.shopHandle}
        productList={productList}
        onClick={toggleLike}
      ></ShopInfo>
      {/* <Popup type="confirm" /> */}
    </ShopListContainer>
  );
};

export default ShopList;
