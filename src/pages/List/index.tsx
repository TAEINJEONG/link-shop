import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/axios";
import * as styles from "./index.styles";
import LogoImage from "../../assets/images/logo.svg";
import SearchIcon from "../../assets/images/search-icon.svg";
import OrderByIcon from "../../assets/images/drop-icon.svg";
import NoDataImg from "../../assets/images/search-store.svg";
import Button from "../../components/Button";
import ShopInfo from "../../components/ShopInfo";
import SortListPopup from "../../components/SortListPopup";
import { LinkShopData } from "../../types/shopList";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopInfoSkeleton from "../../components/ShopInfo/ShopInfoSkeleton";

const List = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shopList, setShopList] = useState<LinkShopData[]>([]);
  const [orderbyPopupVisible, setOrderbyPopupVisible] =
    useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  /* react-router-dom에서 URL파라미터를 담는 커스텀 훅 */
  const [searchParams, setSearchParams] = useSearchParams();

  /* 초기 keyword값과 orderBy값을 파라미터로 만들고 값을 받아오는 부분 */
  const initialSearchQuery = searchParams.get("keyword") || "";
  const initialOrderby = searchParams.get("orderBy") || "recent";

  /* 불러올 데이터가 더 있나 여부 담는곳 */
  const [hasMore, setHasMore] = useState<boolean>(false);
  /* api 호출시 nextCursor의 값을 담는 곳 */
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  /* 디바운드로 검색어 결과를 담아내는 useState (initialSearchQuery값으로 초기 검색어를 가져옴) */
  const [debouncedSearch, setDebouncedSearch] =
    useState<string>(initialSearchQuery);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [orderby, setOrderby] = useState<string>(initialOrderby);

  /* api 파라미터로 보낼값이 있으면 그대로 보내고 없으면 undefined로 보내어 파라미터를 관리 */
  const keywordParam = debouncedSearch ? debouncedSearch : undefined;
  const orderByParam = orderby ? orderby : undefined;

  const fetchShopData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 검색어나 정렬 기준 변경 시 nextCursor를 null로 설정
      setNextCursor(null);
      const shopResponse = await api.getLinkShop(
        "13-2",
        keywordParam,
        orderByParam,
        undefined,
      );
      if (!shopResponse.data || !shopResponse.data.list) {
        console.error("Invalid API response", shopResponse);
        return;
      }
      setShopList(shopResponse.data.list);
      if (shopResponse.data.nextCursor) {
        setHasMore(true);
        setNextCursor(shopResponse.data.nextCursor);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch shop data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [keywordParam, orderByParam]);

  const loadMoreShopData = async () => {
    if (!nextCursor) return;
    try {
      const shopResponse = await api.getLinkShop(
        "13-2",
        keywordParam,
        orderByParam,
        nextCursor,
      );
      if (shopResponse.data.list.length > 0) {
        setShopList((prevData) => [...prevData, ...shopResponse.data.list]);
        if (shopResponse.data.nextCursor) {
          setHasMore(true);
          setNextCursor(shopResponse.data.nextCursor);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("추가 데이터 로드 중 오류:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setIsTimeout(false);
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, 200000);

    fetchShopData();

    return () => clearTimeout(timer);
  }, [fetchShopData]);

  /* debouncing을 사용하여 검색어를 지연 업데이트함 */
  useEffect(() => {
    /* 0.3초 뒤에 검색어(searchQuery)가 변경됨 */
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);

      /* setTimeout은 비동기 함수로 prev부분을 사용함 */
      setSearchParams((prev) => {
        /* Object.fromEntries(prev)를 사용하여 기존의 URL 쿼리 파라미터를 일반 객체 형태로 변환 */
        const newParams = Object.fromEntries(prev);
        /* searchQuery(검색어)가 있으면 검색어를 keyword로 파라미터에 할당 */
        if (searchQuery) {
          newParams.keyword = searchQuery;
        } else {
          /* searchQuery(검색어)가 없으면 keyword 파라미터를 삭제 */
          delete newParams.keyword;
        }
        return newParams;
      });
    }, 300);

    /* 클린 업(cleanUp) 이라고 해서 작업이 끝나면 이전의 타이머를 취소함으로 메모리 누수를 방지 */
    return () => clearTimeout(handler);
    /* searchQuery를 의존성으로 설정하여 값이 바뀔때마다 내부 함수 실행 */
  }, [searchQuery, setSearchParams]);

  const openOrderByPopup = () => setOrderbyPopupVisible(true);

  const closeOrderByPopup = () => setOrderbyPopupVisible(false);

  /* 정렬 */
  const handleOrderByList = (value: "recent" | "likes" | "productsCount") => {
    setOrderby(value);
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      orderBy: value,
    }));
    closeOrderByPopup();
  };

  /* 검색 */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  };

  /* 라벨 이름 매핑 */
  const orderByLabels: Record<string, string> = {
    recent: "최신순",
    likes: "좋아요순",
    productsCount: "상품 많은순",
  };

  return (
    <styles.ShopListContainer>
      <styles.HeaderNavigation>
        <styles.Logo src={LogoImage} alt="로고" />
        <Button variant="Primary" size="medium">
          생성하기
        </Button>
      </styles.HeaderNavigation>

      <styles.InputContainer>
        <styles.SearchInput
          placeholder="샵 이름으로 검색해 보세요."
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <styles.SearchIcon src={SearchIcon} alt="검색 아이콘" />
      </styles.InputContainer>

      <styles.OrderbyContainer
        onClick={() => {
          if (!isLoading) openOrderByPopup();
        }}
      >
        <styles.OrderbyText>
          {orderByLabels[orderby] || "정렬 기준 선택"}
        </styles.OrderbyText>
        <styles.OrderbyIcon src={OrderByIcon} alt="정렬 순서 아이콘" />
      </styles.OrderbyContainer>

      {orderbyPopupVisible && (
        <SortListPopup
          active={orderby}
          onClose={closeOrderByPopup}
          onClick={handleOrderByList}
        />
      )}

      <InfiniteScroll
        dataLength={shopList.length}
        next={loadMoreShopData}
        hasMore={hasMore}
        loader={
          <styles.LoadingContainer>
            <styles.ShopList>
              {[1, 2, 3, 4].map((i) => (
                <ShopInfoSkeleton key={i} />
              ))}
            </styles.ShopList>
          </styles.LoadingContainer>
        }
      >
        <styles.ShopList>
          {shopList.length > 0 ? (
            shopList.map((shop) => <ShopInfo key={shop.id} shop={shop} />)
          ) : isTimeout ? (
            <styles.NoDataContainer>
              <styles.NoDataImage src={NoDataImg} />
              <styles.NoDataMessage>
                검색 결과가 없어요
                <br />
                지금 프로필을 만들고 내 상품을 소개해보세요
              </styles.NoDataMessage>
            </styles.NoDataContainer>
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ShopInfoSkeleton key={i} />)
          )}
        </styles.ShopList>
      </InfiniteScroll>
    </styles.ShopListContainer>
  );
};

export default List;
