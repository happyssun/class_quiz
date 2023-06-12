import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function ProductInput() {
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

      router.push(`/05-board/${result.data.createProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      판매자: <input type="text" onChange={onChangeSeller}></input>
      <br />
      상품명: <input type="text" onChange={onChangeName}></input>
      <br />
      상품내용: <input type="text" onChange={onChangeDetail}></input>
      <br />
      상품가격: <input type="text" onChange={onChangePrice}></input>
      <br />
      <button onClick={onClickSubmit}>상품등록</button>
    </>
  );
}
