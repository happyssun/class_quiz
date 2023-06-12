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

  const [btnColor, setBtnColor] = useState(false);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const router = useRouter();

  const onChangeSeller = (e) => {
    setSeller(e.target.value);
    if (e.target.value && name && detail && price) {
      setBtnColor(true);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    if (seller && e.target.value && detail && price) {
      setBtnColor(true);
    }
  };

  const onChangeDetail = (e) => {
    setDetail(e.target.value);
    if (seller && name && e.target.value && price) {
      setBtnColor(true);
    }
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
    if (seller && name && detail && e.target.value) {
      setBtnColor(true);
    }
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

      router.push(`/07/products/${result.data.createProduct._id}`);
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
      btnColor={btnColor}
    />
  );
}
