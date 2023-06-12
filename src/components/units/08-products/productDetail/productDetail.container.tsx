import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetailUI from "./productDetail.presenter";

export const FETCH_PRODUCT = gql`
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

export default function ProductDetail() {
  const router = useRouter();

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: router.query.productId,
    },
  });
  console.log(router);
  console.log(router.query.productId);

  const onClickEdit = () => {
    router.push(`/08/products/${router.query.productId}/edit`);
  };

  return (
    <ProductDetailUI data={data} onClickEdit={onClickEdit}></ProductDetailUI>
  );
}
