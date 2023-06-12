import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID) {
    fetchProduct(productId: $productId) {
      _id
      seller
      name
      detail
      price
    }
  }
`;

export default function dynamicRoutedPage() {
  const router = useRouter();

  console.log(router);
  console.log(router.query.productId);

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: router.query.productId,
    },
  });

  return (
    <>
      <div> 판매자: {data ? data.fetchProduct.seller : "로딩중입니다..."} </div>
      <br />
      <div> 상품명: {data && data.fetchProduct.name}</div>
      <br />
      <div> 상품내용: {data?.fetchProduct.detail} </div>
      <br />
      <div> 상품가격: {Number(data?.fetchProduct.price)} </div>
      <br />
    </>
  );
}
