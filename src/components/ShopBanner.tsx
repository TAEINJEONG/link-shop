import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import filledHeart from "../assets/images/filled-heart.svg";
import emptyHeart from "../assets/images/empty-heart.svg";
import Share from "../assets/images/share.svg";
import Menu from "../assets/images/meatball-icon.svg";
import ShopPreviewImage from "../assets/images/shop-image.svg";
import * as styles from "./ShopBanner.styles";

interface ShopBannerProps {
  shopId: number;
  isLike: boolean;
  likeCount: number;
  shopImage?: string;
  shopName: string;
  shopHandle: string;
  onClick: () => void;
}

const ShopBanner = ({
  shopId,
  isLike,
  likeCount,
  shopImage = ShopPreviewImage,
  shopName,
  shopHandle,
  onClick,
}: ShopBannerProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  /* 메모이제이션에 대해서 추가 학습 */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuVisible(false);
    }
  }, []);
  const location = useLocation();
  const currentPageUrl = window.location.origin + location.pathname;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const copyUrlToClipboard = useCallback(async () => {
    try {
      const shopUrl = `${currentPageUrl}${shopId}`;
      await navigator.clipboard.writeText(shopUrl);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 2000);
    } catch (error) {
      alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
      console.error("URL 복사 실패:", error);
    }
  }, [currentPageUrl, shopId]); // currentPageUrl, shopId가 변경될 때만 함수가 재생성됨

  const openShopMenu = () => setIsMenuVisible((prev) => !prev);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <styles.BannerContainer>
      <styles.BannerTopSection>
        <styles.LikeShopButton onClick={onClick}>
          <styles.BaseIcon src={isLike ? filledHeart : emptyHeart} />
          <styles.LikeCount>{likeCount}</styles.LikeCount>
        </styles.LikeShopButton>

        <styles.RightIcons>
          <styles.BaseIcon src={Share} onClick={copyUrlToClipboard} />
          <styles.MenuListContainer ref={menuRef}>
            <styles.BaseIcon src={Menu} onClick={openShopMenu} />

            {isMenuVisible && (
              <styles.ShopMenuList>
                <styles.EditButton>수정하기</styles.EditButton>
                <styles.MenuButton>삭제하기</styles.MenuButton>
              </styles.ShopMenuList>
            )}
          </styles.MenuListContainer>
        </styles.RightIcons>
      </styles.BannerTopSection>

      <styles.BannerCenterSection>
        <styles.ShopImage src={shopImage} />
        <styles.ShopName>{shopName}</styles.ShopName>
        <styles.ShopId>@{shopHandle}</styles.ShopId>
      </styles.BannerCenterSection>

      {isToastVisible && (
        <styles.ToastContainer>
          <styles.ToastMessage>URL이 복사되었습니다!</styles.ToastMessage>
        </styles.ToastContainer>
      )}
    </styles.BannerContainer>
  );
};

export default ShopBanner;
