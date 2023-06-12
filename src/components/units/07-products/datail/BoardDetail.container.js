import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCT } from "./BoardDetail.query";
import BoardDetialUI from "./BoardDetail.presenter";

export default function BoardDetail() {
  const router = useRouter();

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: router.query.productId,
    },
  });

  console.log(router);
  console.log(router.query.productId);

  return <BoardDetialUI data={data} />;
}
