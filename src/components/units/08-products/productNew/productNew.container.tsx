import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import ProductNewUI from "./productNew.presenter";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "./productNew.queris";
import { IproductNewProps, IUpdateProductInput } from "./productNew.types";
import {
  Mutation,
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
} from "../../../../commons/types/generated/types";
import { message } from "antd";

export default function ProductNew(props: IproductNewProps) {
  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const [createProduct] = useMutation<
    Pick<Mutation, "createProduct">,
    MutationCreateProductArgs
  >(CREATE_PRODUCT);

  const [updateProduct] = useMutation<
    Pick<Mutation, "updateProduct">,
    MutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  const router = useRouter();

  const onChangeSeller = (e: ChangeEvent<HTMLInputElement>) => {
    setSeller(e.target.value);
    if (e.target.value && name && detail && price) {
      setIsActiveBtn(true);
    }
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (seller && e.target.value && detail && price) {
      setIsActiveBtn(true);
    }
  };
  const onChangeDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
    if (seller && name && e.target.value && price) {
      setIsActiveBtn(true);
    }
  };
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
    if (seller && name && detail && e.target.value) {
      setIsActiveBtn(true);
    }
  };

  const onClickSubmit = async () => {
    if (seller && name && detail && price) {
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

        router.push(`/08/products/${result.data.createProduct._id}`);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("정보를 모두 입력하세요!");
      setIsActiveBtn(false);
    }
  };

  const onClickUpdate = async () => {
    const updateProductInput: IUpdateProductInput = {};

    if (name) updateProductInput.name = name;
    if (detail) updateProductInput.detail = detail;
    if (price) updateProductInput.price = price;

    try {
      const result = await updateProduct({
        variables: {
          productId: String(router.query.productId),
          updateProductInput,
        },
      });

      alert(result.data?.updateProduct.message);

      router.push(`/08/products/${result.data.updateProduct._id}`);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ProductNewUI
      onChangeSeller={onChangeSeller}
      onChangeName={onChangeName}
      onChangeDetail={onChangeDetail}
      onChangePrice={onChangePrice}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      isActiveBtn={isActiveBtn}
      data={props.data}
      isEdit={props.isEdit}
    ></ProductNewUI>
  );
}
