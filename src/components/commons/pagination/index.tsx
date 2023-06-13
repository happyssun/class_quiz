import styled from "@emotion/styled";
import { useState } from "react";

const PageNum = styled.span<{ isActive?: boolean }>`
  margin: 10px;
  color: ${({ isActive }) => (isActive ? "red" : "blue")};
`;

export default function PagiNation(props) {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);

  // const { data, refetch } = useQuery(FETCH_BOARDS_COUNT); 부모로 보내기

  const lastPage = props.count ? Math.ceil(props.count / 10) : 0;

  const onClickPage = (e) => {
    const activedPage = Number(e.currentTarget.id);
    setActivedPage(activedPage);
    void props.refetch({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    void props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      props.refetch({ page: startPage + 10 });
    }
  };

  return (
    <>
      <PageNum onClick={onClickPrevPage}> {`〈 `}</PageNum>
      {new Array(10).fill(1).map((data, index) => {
        return (
          index + startPage <= lastPage && (
            <PageNum
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              isActive={startPage + index === activedPage}
            >
              {index + startPage}
            </PageNum>
          )
        );
      })}
      <PageNum onClick={onClickNextPage}> {`〉`} </PageNum>
    </>
  );
}
