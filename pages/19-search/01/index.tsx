import { gql, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import styled from "@emotion/styled";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
`;
const Box = styled.div`
  border: 2px solid blue;
  margin: 50px 0;
`;

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onChangeSearchWithBtn = (e) => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearch = () => {
    refetch({ search, page: 1 });
  };

  const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(e.currentTarget.id) });
  };

  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    setKeyword(value);
  }, 500);

  const onChangeSearchNoBtn = (e) => {
    getDebounce(e.currentTarget.value);
  };

  // 키워드 양옆으로 붙여서 키워드 글자만 따로 분리
  const SECRET = "#$%";

  return (
    <>
      <Box>
        <div style={{ margin: "10px 0" }}>1. 검색버튼으로 검색하기 :</div>
        <input
          type="text"
          placeholder="검색어 입력"
          onChange={onChangeSearchWithBtn}
        />
        <button onClick={onClickSearch}>검색하기</button>
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column>
              {el.writer
                .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                .split(SECRET)
                .map((el) => (
                  <span
                    style={{ color: el === keyword ? "red" : "black" }}
                    key={uuidv4()}
                  >
                    {el}
                  </span>
                ))}
            </Column>
            <Column>{el.title}</Column>
            <div style={{ width: "50%" }}>{el.contents}</div>
          </Row>
        ))}
        <br />
        {new Array(10).fill(0).map((_, index) => (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {" "}
            {index + 1}
          </span>
        ))}
      </Box>

      <Box>
        <div style={{ margin: "10px 0" }}>
          2. 검색버튼 없이 검색하기 : 디바운싱
        </div>
        <input
          type="text"
          placeholder="검색어 입력"
          onChange={onChangeSearchNoBtn}
        />
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column>{el.writer}</Column>
            <Column>{el.title}</Column>
            <div style={{ width: "50%" }}>{el.contents}</div>
          </Row>
        ))}
      </Box>
    </>
  );
}
