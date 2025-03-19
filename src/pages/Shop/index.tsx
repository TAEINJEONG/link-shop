import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkShopData, ShopResponse } from "../../api/axios";
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

  const convertShopResponseToLinkShopData = (
    data: ShopResponse,
  ): LinkShopData => ({
    // ShopResponse의 id를 문자열로 변환
    id: data.id.toString(),
    name: data.name,
    userId: data.userId,
    // shop 부분도 변환하여 필요한 필드만 전달
    shop: {
      id: data.shop.id.toString(),
      shopUrl: data.shop.shopUrl,
      urlName: data.shop.urlName,
      imageUrl: data.shop.imageUrl,
    },
    likes: data.likes,
    teamId: data.teamId,
    productsCount: data.productsCount,
    password: data.password,
    // products 배열의 각 항목의 id를 문자열로 변환
    products: data.products.map((product) => ({
      id: typeof product.id === "number" ? product.id : product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price:
        typeof product.price === "number"
          ? product.price
          : Number(product.price),
    })),
  });

  const fetchShopData = useCallback(async () => {
    if (!id) return;
    try {
      const shopResponse = await api.getLinkShopById("13-2", id);
      const convertedData = convertShopResponseToLinkShopData(
        shopResponse.data,
      );
      setShopData(convertedData);
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
