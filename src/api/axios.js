import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://linkshop-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRoutes = {
  recipients: {
    list: (team) => `/${team}/linkshops/`,
    detail: (team, linkshopId) => `/${team}/linkshops/${linkshopId}/`,
    like: (team, linkshopId) => `/${team}/linkshops/${linkshopId}/like`,
  },
};

const api = {
  // 링크샵 목록 조회
  getLinkShop: (team, keyword, orderby, cursor) =>
    apiClient.get(apiRoutes.list(team), {
      params: { keyword, orderby, cursor },
    }),
  // 링크샵 생성
  postLinkShop: (team, data) => apiClient.post(apiRoutes.list(team), data),
  // 링크샵 상세 조회
  getLinkShopById: (team, linkshopId) =>
    apiClient.get(apiRoutes.detail(team, linkshopId)),
  // 링크샵 수정
  putLinkShop: (team, linkshopId, data) =>
    apiClient.put(apiRoutes.detail(team, linkshopId), data),
  // 링크샵 삭제
  deleteLinkShop: (team, linkshopId, password) =>
    apiClient.delete(apiRoutes.detail(team, linkshopId), password),
  // 링크샵 좋아요 추가
  postLinkShopLike: (team, linkshopId) =>
    apiClient.post(apiRoutes.detail(team, linkshopId)),
  // 링크샵 좋아요 삭제
  deleteLinkShopLike: (team, linkshopId) =>
    apiClient.delete(apiRoutes.delete(team, linkshopId)),

  // 파일 업로드
  uploadFile: (data) => apiClient.post("/images/upload", data),
};

export default api;
