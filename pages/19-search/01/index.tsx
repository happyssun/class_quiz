import { useQuery, gql } from "@apollo/client";
import { Table, Input, Button, Pagination } from "antd";

import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import type { ChangeEvent } from "react";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import styled from "@emotion/styled";

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

export default function SearchWithAntDesign() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS, {
    variables: { page: currentPage, search },
  });

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearch = (): void => {
    setCurrentPage(1);
    refetch({ search, page: 1 });
  };

  const onClickPage = (page): void => {
    setCurrentPage(page);
    refetch({ page, search });
  };

  const columns: ColumnsType = [
    {
      title: "Writer",
      dataIndex: "writer",
      key: "writer",
    },
    {
      title: "Contents",
      dataIndex: "contents",
      key: "contents",
    },
  ];

  return (
    <>
      검색어입력: <Input type="text" onChange={onChangeSearch} />
      <Button onClick={onClickSearch}>검색하기</Button>
      <Table
        columns={columns}
        dataSource={data?.fetchBoards || []}
        rowKey="_id"
        // pagination={false} // Disable built-in pagination
        size="small"
      />
    </>
  );
}

// antd 디자인을 이용한 현재 페이지와
// class의 20-01-search 페이지 내용 비교해보기

/*  기존 페이지 네이션 부분
{new Array(10).fill(1).map((_, index) => (
  <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
    {""}
    {index + 1}
  </span>
))}
*/
