import * as skeleton from "./index.styles";

const ShopInfoSkeleton = () => {
  return (
    <skeleton.ShopInfoContainer>
      <skeleton.ShopInfoHeaderSection>
        <skeleton.ShopInfoHeaderLeft>
          <skeleton.ShopImage />
        </skeleton.ShopInfoHeaderLeft>

        <skeleton.ShopInfoHeaderRight>
          <skeleton.LikeIcon />
          <skeleton.LikeCount />
        </skeleton.ShopInfoHeaderRight>
      </skeleton.ShopInfoHeaderSection>

      <skeleton.ShopInfoProductList>
        <skeleton.ProductCount />
        <skeleton.ProductImageList>
          {[1, 2, 3].map((i) => (
            <skeleton.ProductImage key={i} />
          ))}
        </skeleton.ProductImageList>
      </skeleton.ShopInfoProductList>
    </skeleton.ShopInfoContainer>
  );
};

export default ShopInfoSkeleton;
