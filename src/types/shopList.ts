// 개별 상품에 대한 타입
export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
}

// 매장(shop)에 대한 상세 타입
export interface Shop {
  id: string;
  shopUrl: string;
  urlName: string;
  imageUrl: string;
}

// API에서 받아오는 원본 데이터 타입 (개별 링크샵 데이터)
export interface LinkShopData {
  id: string;
  name: string;
  userId: string;
  shop: Shop;
  likes: number;
  productsCount: number;
  products: Product[];
}
