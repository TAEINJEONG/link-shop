import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import filledHeart from "../assets/images/filled-heart.svg";
import emptyHeart from "../assets/images/empty-heart.svg";
import Share from "../assets/images/share.svg";
import Menu from "../assets/images/meatball-icon.svg";
import ShopPreviewImage from "../assets/images/shop-image.svg";
import * as styles from "./ShopBanner.styles";
import { LinkShopData } from "../types/shopList";
import api from "../api/axios";

interface ShopInfoProps {
  shop: LinkShopData;
}

const ShopBanner = ({ shop }: ShopInfoProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuVisible(false);
    }
  }, []);
  const location = useLocation();
  const currentPageUrl = window.location.origin + location.pathname;
  const [shopData, setShopData] = useState<LinkShopData>(shop);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLike, setHasLike] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const copyUrlToClipboard = useCallback(async () => {
    try {
      const shopUrl = `${currentPageUrl}`;
      await navigator.clipboard.writeText(shopUrl);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 2000);
    } catch (error) {
      alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
      console.error("URL 복사 실패:", error);
    }
  }, [currentPageUrl]);

  const openShopMenu = () => setIsMenuVisible((prev) => !prev);

  const toggleLike = useCallback(
    async (shopId: string) => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          if (!hasLike) {
            await api.postLinkShopLike("13-2", shopId);
            setHasLike(true);
            setShopData((prevData) => ({
              ...prevData,
              likes: prevData.likes + 1,
            }));
          } else {
            await api.deleteLinkShopLike("13-2", shopId);
            setHasLike(false);
            setShopData((prevData) => ({
              ...prevData,
              likes: prevData.likes - 1,
            }));
          }
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Failed to fetch shop like:", e);
      }
    },
    [isLoading, hasLike],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <styles.BannerContainer>
      <styles.BannerTopSection>
        <styles.LikeShopButton onClick={() => toggleLike(shopData.id)}>
          <styles.BaseIcon
            src={hasLike ? filledHeart : emptyHeart}
            alt="하트 아이콘"
          />
          <styles.LikeCount>{shopData.likes}</styles.LikeCount>
        </styles.LikeShopButton>

        <styles.RightIcons>
          <styles.BaseIcon
            src={Share}
            onClick={copyUrlToClipboard}
            alt="복사 아이콘"
          />
          <styles.MenuListContainer ref={menuRef}>
            <styles.BaseIcon
              src={Menu}
              onClick={openShopMenu}
              alt="메뉴 아이콘"
            />

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
        <styles.ShopImage
          src={shopData?.shop.imageUrl || ShopPreviewImage}
          alt={`${shopData?.name} 매장 이미지`}
        />
        <styles.ShopName>{shopData?.name}</styles.ShopName>
        <styles.ShopId>@{shopData?.userId}</styles.ShopId>
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
