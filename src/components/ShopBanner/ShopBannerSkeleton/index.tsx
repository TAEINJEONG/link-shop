import * as skeleton from "./index.styles";

const ShopBanner = () => {
  return (
    <>
      <skeleton.BannerContainer>
        <skeleton.BannerTopSection>
          <skeleton.LikeShopButton>
            <skeleton.BaseIcon />
            <skeleton.LikeCount />
          </skeleton.LikeShopButton>

          <skeleton.RightIcons>
            <skeleton.BaseIcon />
            <skeleton.MenuListContainer>
              <skeleton.BaseIcon />
            </skeleton.MenuListContainer>
          </skeleton.RightIcons>
        </skeleton.BannerTopSection>

        <skeleton.BannerCenterSection>
          <skeleton.ShopImage />
          <skeleton.ShopName />
          <skeleton.ShopId />
        </skeleton.BannerCenterSection>
      </skeleton.BannerContainer>
    </>
  );
};

export default ShopBanner;
