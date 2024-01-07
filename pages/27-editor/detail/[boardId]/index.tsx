import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Dompurify from "dompurify";

const FECTH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardDetailPage() {
  const router = useRouter();
  console.log(router);
  const { data } = useQuery(FECTH_BOARD, {
    variables: {
      boardId: router.query.boardId,
    },
  });

  return (
    <>
      <div>작성자 : {data?.fetchBoard.writer} </div>
      <div>제목 :{data?.fetchBoard.title} </div>
      {typeof window !== "undefined" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      ) : (
        <div /> // 서버사이드 렌더링을 위해서 넣은 코드의 조건문을 맞추기 위해 넣어놓은 것
      )}

      {/* <div>내용: {data?.fetchBoard.contents}</div>  이렇게 넣음 태그가 다 그대로보임*/}
    </>
  );
}

/*
typeof window !== "undefined" 조건은 
주로 Next.js와 같은 서버 사이드 렌더링(SSR) 프레임워크에서 클라이언트 사이드 코드를 실행할 때 사용. 
이 조건을 사용하는 이유는 서버에서 실행되는 초기 렌더링 단계에서는 window 객체가 존재하지 않기 때문입니다.
 */
