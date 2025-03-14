import axios, { AxiosInstance, AxiosResponse } from "axios";

// API 응답 타입 (제네릭 적용)
type ApiResponse<T> = AxiosResponse<{ list: T[]; nextCursor: string | null }>;

// 개별 상품 데이터 타입
export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
}

// shop에 대한 상세 타입
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
  teamId: string;
  productsCount: number;
  products: Product[];
}

// 파일 업로드 타입
interface FileUploadData {
  file: File;
}

// API 클라이언트 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://linkshop-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// API 경로 관리
const apiRoutes = {
  recipients: {
    list: (team: string): string => `/${team}/linkshops/`,
    detail: (team: string, linkshopId: string): string =>
      `/${team}/linkshops/${linkshopId}/`,
    like: (team: string, linkshopId: string): string =>
      `/${team}/linkshops/${linkshopId}/like`,
  },
};

// API 함수
const api = {
  // 🔹 링크샵 목록 조회
  getLinkShop: (
    team: string,
    keyword?: string,
    orderBy?: string,
    cursor?: string,
  ): Promise<ApiResponse<LinkShopData>> =>
    apiClient.get(apiRoutes.recipients.list(team), {
      params: { keyword, orderBy, cursor },
    }),

  // 🔹 링크샵 생성
  postLinkShop: (
    team: string,
    data: LinkShopData,
  ): Promise<AxiosResponse<LinkShopData>> =>
    apiClient.post(apiRoutes.recipients.list(team), data),

  // 🔹 링크샵 상세 조회
  getLinkShopById: (
    team: string,
    linkshopId: string,
  ): Promise<AxiosResponse<LinkShopData>> =>
    apiClient.get(apiRoutes.recipients.detail(team, linkshopId)),

  // 🔹 링크샵 수정
  putLinkShop: (
    team: string,
    linkshopId: string,
    data: LinkShopData,
  ): Promise<AxiosResponse<LinkShopData>> =>
    apiClient.put(apiRoutes.recipients.detail(team, linkshopId), data),

  // 🔹 링크샵 삭제
  deleteLinkShop: (
    team: string,
    linkshopId: string,
    password: string,
  ): Promise<AxiosResponse<void>> =>
    apiClient.delete(apiRoutes.recipients.detail(team, linkshopId), {
      data: { password },
    }),

  // 🔹 링크샵 좋아요 추가
  postLinkShopLike: (
    team: string,
    linkshopId: string,
  ): Promise<AxiosResponse<void>> =>
    apiClient.post(apiRoutes.recipients.like(team, linkshopId)),

  // 🔹 링크샵 좋아요 삭제
  deleteLinkShopLike: (
    team: string,
    linkshopId: string,
  ): Promise<AxiosResponse<void>> =>
    apiClient.delete(apiRoutes.recipients.like(team, linkshopId)),

  // 🔹 파일 업로드
  uploadFile: (data: FileUploadData): Promise<AxiosResponse<{ url: string }>> =>
    apiClient.post("/images/upload", data),
};

export default api;
