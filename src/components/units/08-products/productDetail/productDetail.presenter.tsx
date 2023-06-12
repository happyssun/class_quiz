export default function ProductDetailUI(props) {
  return (
    <>
      <div> 상품 상세정보</div>
      <br />
      <div> 판매자:{props.data?.fetchProduct?.seller}</div>
      <br />
      <div> 상품명: {props.data?.fetchProduct.name}</div>
      <br />
      <div> 상품내용: {props.data?.fetchProduct.detail} </div>
      <br />
      <div> 상품가격: {Number(props.data?.fetchProduct.price)} </div>
      <br />
      <button onClick={props.onClickEdit}>상품 수정</button>
    </>
  );
}
