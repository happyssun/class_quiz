// 함수형 컴포넌트 불러오는 방식을 함수 자체를 불러오는 방식으로 변경해보기
import Presenter from "./presenter";

export default function Contationer() {
  return (
    <>
      {/* <Presenter child="철수" /> */}
      {Presenter({ child: "철수" })}
    </>
  );
}

// presenter 사실 이건 함수이다. 함수를 가져오는 것이기 때문에 이렇게 가져올수 있다
