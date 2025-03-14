import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    background-position: 0% 0%
  }
  100% {
    background-position: -135% 0%
  }
`;

const SkeletonWrapper = styled.div`
  background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
  background-size: 400% 400%;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const ShopInfoContainerSkeleton = styled(SkeletonWrapper)`
  padding: 24px;
  width: calc(50% - 60px);
  border-radius: 25px;

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }

  @media only screen and (max-width: 744px) {
    width: 100%;
    overflow: scroll;
  }
`;

const ShopInfoHeaderSectionSkeleton = styled(SkeletonWrapper)`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ShopInfoHeaderLeftSkeleton = styled(SkeletonWrapper)`
  display: flex;
  border-radius: 99px;
`;

const ShopImageSkeleton = styled(SkeletonWrapper)`
  width: 60px;
  height: 60px;
  border-radius: 99px;
`;

const ShopTextSectionSkeletopn = styled(SkeletonWrapper)`
  display: flex;
  flex-direction: column;
  padding: 6.5px 0;
`;

const ShopNameSkeleton = styled(SkeletonWrapper)`
  margin-bottom: 7px;
  height: 18px;
`;

const ShopHandleSkeleton = styled(SkeletonWrapper)`
  height: 16px;
`;

const ShopInfoHeaderRightSkeleton = styled(SkeletonWrapper)`
  display: flex;
  align-items: end;
`;

const LikeIconSkeleton = styled(SkeletonWrapper)`
  width: 23px;
  height: 23px;
`;

const LikeCountSkeleton = styled(SkeletonWrapper)`
  width: 30px;
  height: 16px;
`;

const ShopInfoProductListSkeleton = styled(SkeletonWrapper)`
  display: flex;
  flex-direction: column;
`;

const ProductCountSkeleton = styled(SkeletonWrapper)`
  margin-bottom: 8px;
  height: 15px;
`;

const ProductImageListSkeleton = styled(SkeletonWrapper)`
  display: flex;
  gap: 12px;

  @media only screen and (max-width: 744px) {
    overflow: scroll;
  }
`;

const ProductImageSkeleton = styled(SkeletonWrapper)`
  width: 95px;
  height: 95px;
  border-radius: 15px;
`;

const ShopSkeleton = () => {
  return (
    <ShopInfoContainerSkeleton>
      <ShopInfoHeaderSectionSkeleton>
        <ShopInfoHeaderLeftSkeleton>
          <ShopImageSkeleton />
          <ShopTextSectionSkeletopn>
            <ShopNameSkeleton />
            <ShopHandleSkeleton />
          </ShopTextSectionSkeletopn>
        </ShopInfoHeaderLeftSkeleton>

        <ShopInfoHeaderRightSkeleton>
          <LikeIconSkeleton />
          <LikeCountSkeleton />
        </ShopInfoHeaderRightSkeleton>
      </ShopInfoHeaderSectionSkeleton>

      <ShopInfoProductListSkeleton>
        <ProductCountSkeleton />
        <ProductImageListSkeleton>
          {[1, 2, 3].map((i) => (
            <ProductImageSkeleton key={i} />
          ))}
        </ProductImageListSkeleton>
      </ShopInfoProductListSkeleton>
    </ShopInfoContainerSkeleton>
  );
};

export default ShopSkeleton;
