export default function BoardDetialUI(props) {
  return (
    <>
      <div>
        판매자:
        {props.data?.fetchProduct?.seller}
      </div>
      <br />
      <div> 상품명: {props.data?.fetchProduct.name}</div>
      <br />
      <div> 상품내용: {props.data?.fetchProduct.detail} </div>
      <br />
      <div> 상품가격: {Number(props.data?.fetchProduct.price)} </div>
      <br />
    </>
  );
}
