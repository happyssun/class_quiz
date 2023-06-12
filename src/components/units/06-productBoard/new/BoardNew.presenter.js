export default function ProductNewUI(props) {
  return (
    <>
      판매자: <input type="text" onChange={props.onChangeSeller}></input>
      <br />
      상품명: <input type="text" onChange={props.onChangeName}></input>
      <br />
      상품내용: <input type="text" onChange={props.onChangeDetail}></input>
      <br />
      상품가격: <input type="text" onChange={props.onChangePrice}></input>
      <br />
      <button onClick={props.onClickSubmit}>상품등록</button>
    </>
  );
}
