import { ApolloQueryResult, gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import PagiNation from "../../../src/components/commons/pagination";
import {
  Query,
  QueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      number
      writer
      title
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCounds {
    fetchBoardsCount
  }
`;

const Column = styled.span`
  margin: 10px;
`;

const PageNum = styled.span`
  margin: 10px;
`;

export default function PagiNationPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div>
          <Column>{el.number}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </div>
      ))}

      <PagiNation
        count={dataBoardsCount?.fetchBoardsCount}
        refetch={refetch}
        data={data}
      ></PagiNation>
    </>
  );
}
