import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      number
      writer
      title
    }
  }
`;

const Column = styled.span`
  margin: 10px;
`;

const PageNum = styled.span`
  margin: 10px;
`;

export default function InfiniteScrollerPage() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  // 스크롤이 해당 영역의 하단 끝에 닿았을때 실행되어야 할 함수
  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      {data?.fetchBoards.map((el) => (
        <InfiniteScroll pageStart={1} loadMore={onLoadMore} hasMore={true}>
          <Column>{el.number}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </InfiniteScroll>
      ))}
    </div>
  );
}
