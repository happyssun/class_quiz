import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_PRODUCTS = gql`
  query fetchProducts {
    fetchProducts {
      _id
      seller
      name
      detail
      price
    }
  }
`;

const FETCH_PRODUCT = gql`
  mutation deleteProduct($productId: ID) {
    deleteProduct(productId: $productId) {
      message
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 20%;
`;

export default function ProductPage() {
  const [deleteProduct] = useMutation(FETCH_PRODUCT);

  const { data } = useQuery(FETCH_PRODUCTS);

  const onClickDelete = async (event) => {
    await deleteProduct({
      variables: {
        productId: event.target.id, // 버튼클릭시 이벤트 발생 그 타겟은 버튼이고 버튼에 id값(문자열) : 숫자로 바꿔줌
      },
      refetchQueries: [{ query: FETCH_PRODUCTS }],
    });
  };

  return (
    <>
      {data?.fetchProducts.map((el) => (
        <Row key={el._id}>
          <Column>
            <input type="checkbox"></input>
          </Column>
          <Column>{el._id}</Column>
          <Column>{el.seller}</Column>
          <Column>{el.name}</Column>
          <Column>{el.detail}</Column>
          <Column>{el.price}</Column>
          <Column>
            <button id={el.productId} onClick={onClickDelete}>
              삭제
            </button>
          </Column>
        </Row>
      ))}
    </>
  );
}
