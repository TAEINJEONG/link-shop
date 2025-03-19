import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkShopData } from "../../types/shopList";
import api from "../../api/axios";
import ShopBanner from "../../components/ShopBanner";
import ShopTent from "../../assets/images/long-store-tent.svg";
import backIcon from "../../assets/images/back-icon.svg";
import * as styles from "./index.styles";
import * as skeleton from "./index.skeleton";
import ShopBannerSkeleton from "../../components/ShopBanner/ShopBannerSkeleton";

const Shop = () => {
  const [shopData, setShopData] = useState<LinkShopData>();
  const { id } = useParams();

  const fetchShopData = useCallback(async () => {
    if (!id) return;
    try {
      const shopResponse = await api.getLinkShopById("13-2", id);
      setShopData(shopResponse.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  return (
    <>
      <styles.Shoptent src={ShopTent} />
      <styles.ShopContainer>
        <styles.PrevContainer>
          <styles.prevTag src={backIcon} />
          <styles.PrevPage to="/list">돌아가기</styles.PrevPage>
        </styles.PrevContainer>
        {shopData ? <ShopBanner shop={shopData} /> : <ShopBannerSkeleton />}
        <styles.representativeProduct>대표 상품</styles.representativeProduct>
        <styles.ProductList>
          {shopData?.products
            ? shopData.products.map((product) => (
                <styles.Product key={product.id}>
                  <styles.ProductImage src={product.imageUrl} />
                  <styles.ProductInfoContainer>
                    <styles.ProductName>{product.name}</styles.ProductName>
                    <styles.ProductPrice>
                      ₩{product.price.toLocaleString()}
                    </styles.ProductPrice>
                  </styles.ProductInfoContainer>
                </styles.Product>
              ))
            : [1, 2, 3].map((i) => (
                <skeleton.Product key={i}>
                  <skeleton.ProductImage />
                  <skeleton.ProductInfoContainer>
                    <skeleton.ProductName />
                    <skeleton.ProductPrice />
                  </skeleton.ProductInfoContainer>
                </skeleton.Product>
              ))}
        </styles.ProductList>
      </styles.ShopContainer>
    </>
  );
};

export default Shop;
