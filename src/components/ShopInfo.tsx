import * as styles from "./ShopInfo.styles";
import ShopPreviewImage from "../assets/images/shop-image.svg";
import filledHeart from "../assets/images/filled-heart.svg";
import emptyHeart from "../assets/images/empty-heart.svg";

interface ShopInfoProps {
  isLike: boolean;
  likeCount: number;
  shopImage?: string;
  shopName: string;
  shopHandle: string;
  productList: string[];
  onClick: () => void;
}

const ShopInfo = ({
  isLike,
  likeCount,
  shopImage = ShopPreviewImage,
  shopName,
  shopHandle,
  productList,
  onClick,
}: ShopInfoProps) => {
  return (
    <styles.ShopInfoContainer>
      <styles.ShopInfoHeaderSection>
        <styles.ShopInfoHeaderLeft>
          <styles.ShopImage src={shopImage} />
          <styles.ShopTextSection>
            <styles.ShopName>{shopName}</styles.ShopName>
            <styles.ShopHandle>@{shopHandle}</styles.ShopHandle>
          </styles.ShopTextSection>
        </styles.ShopInfoHeaderLeft>

        <styles.ShopInfoHeaderRight onClick={onClick}>
          <styles.LikeIcon src={isLike ? filledHeart : emptyHeart} />
          <styles.LikeCount>{likeCount}</styles.LikeCount>
        </styles.ShopInfoHeaderRight>
      </styles.ShopInfoHeaderSection>

      <styles.ShopInfoProductList>
        <styles.ProductCount>대표상품 {productList.length}</styles.ProductCount>
        <styles.productImageList>
          {productList.map((product) => (
            <styles.PorductImage src={product} />
          ))}
        </styles.productImageList>
      </styles.ShopInfoProductList>
    </styles.ShopInfoContainer>
  );
};

export default ShopInfo;
