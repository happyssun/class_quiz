import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Query,
  QueryFetchProductArgs,
} from "../../../../../src/commons/types/generated/types";
import ProductNew from "../../../../../src/components/units/08-products/productNew/productNew.container";

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

export default function ProductEditPage() {
  const router = useRouter();

  // if (typeof router.query.productId !== "string") {
  //   router.push("/");
  //   return;
  // }

  const { data } = useQuery<Pick<Query, "fetchProduct">, QueryFetchProductArgs>(
    FETCH_PRODUCT,
    {
      variables: { productId: String(router.query.productId) },
    }
  );
  console.log(router.query.productId);

  return <ProductNew isEdit={true} data={data}></ProductNew>;
}
