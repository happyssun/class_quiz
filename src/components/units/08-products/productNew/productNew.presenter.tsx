import { IProductNewUIProps } from "./productNew.types";
import { Button } from "./productNew.styles";

export default function ProductNewUI(props: IProductNewUIProps) {
  return (
    <>
      <div>{props.isEdit ? "상품등록 수정" : " 상품등록"}</div>
      판매자:
      <input
        type="text"
        onChange={props.onChangeSeller}
        value={props.data?.fetchProduct.seller}
      ></input>
      <br />
      상품명:
      <input
        type="text"
        onChange={props.onChangeName}
        defaultValue={props.data?.fetchProduct.name}
      ></input>
      <br />
      상품내용:
      <input
        type="text"
        onChange={props.onChangeDetail}
        defaultValue={props.data?.fetchProduct.detail}
      ></input>
      <br />
      상품가격:
      <input
        type="text"
        onChange={props.onChangePrice}
        defaultValue={props.data?.fetchProduct.price}
      ></input>
      <br />
      <Button
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
        isActiveBtn={props.isEdit ? true : props.isActiveBtn}
      >
        {props.isEdit ? "상품 수정하기" : "상품 등록하기"}
      </Button>
    </>
  );
}
