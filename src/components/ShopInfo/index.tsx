import * as styles from "./index.styles";
import ShopPreviewImage from "../../assets/images/shop-image.svg";
import filledHeart from "../../assets/images/filled-heart.svg";
import emptyHeart from "../../assets/images/empty-heart.svg";
import { LinkShopData } from "../../types/shopList";
import { useCallback, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

interface ShopInfoProps {
  shop: LinkShopData;
}

const ShopInfo = ({ shop }: ShopInfoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shopData, setShopData] = useState<LinkShopData>(shop);
  const [hasLike, setHasLike] = useState<boolean>(false);

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

  return (
    <styles.ShopInfoContainer as={Link} to={`/${shop.id}`}>
      <styles.ShopInfoHeaderSection>
        <styles.ShopInfoHeaderLeft>
          <styles.ShopImage
            src={shopData.shop.imageUrl || ShopPreviewImage}
            alt={`${shopData.name} 매장 이미지`}
          />
          <styles.ShopTextSection>
            <styles.ShopName>{shopData.name}</styles.ShopName>
            <styles.ShopHandle>@{shopData.userId}</styles.ShopHandle>
          </styles.ShopTextSection>
        </styles.ShopInfoHeaderLeft>

        <styles.ShopInfoHeaderRight onClick={() => toggleLike(shopData.id)}>
          <styles.LikeIcon src={hasLike ? filledHeart : emptyHeart} />
          <styles.LikeCount>{shopData.likes}</styles.LikeCount>
        </styles.ShopInfoHeaderRight>
      </styles.ShopInfoHeaderSection>

      <styles.ShopInfoProductList>
        <styles.ProductCount>
          대표상품 {shopData.products.length}
        </styles.ProductCount>
        <styles.productImageList>
          {shopData.products?.map((product) => (
            <styles.ProductImage
              key={product.id}
              src={product?.imageUrl}
              alt={product.name}
            />
          ))}
        </styles.productImageList>
      </styles.ShopInfoProductList>
    </styles.ShopInfoContainer>
  );
};

export default ShopInfo;
