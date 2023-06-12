import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { CREATE_PRODUCT } from "./BoardNew.query";
import ProductInputUI from "./BoardNew.presenter";

export default function ProductNew() {
  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const router = useRouter();

  const onChangeSeller = (e) => {
    setSeller(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDetail = (e) => {
    setDetail(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          seller,
          createProductInput: {
            name,
            detail,
            price: Number(price),
          },
        },
      });
      console.log(result.data.createProduct._id);
      alert(result.data.createProduct.message);

      router.push(`/06/productBoard/${result.data.createProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProductInputUI
      onChangeSeller={onChangeSeller}
      onChangeName={onChangeName}
      onChangeDetail={onChangeDetail}
      onChangePrice={onChangePrice}
      onClickSubmit={onClickSubmit}
    />
  );
}
