import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation {
    createBoard(writer: "sun1", title: "hard cording", contents: "example") {
      _id
      number
      message
    }
  }
`;

export default function GRAPHQL_API() {
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard();
    console.log(result.data);
  };
  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </>
  );
}
