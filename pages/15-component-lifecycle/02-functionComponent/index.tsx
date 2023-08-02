import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 함수형 컴포넌트에서의 라이프사이클에서 훅을 사용가능
// 클라스형 컴포넌트와 비교해 보면 componentDidUpdate()등 대신 useEffect()를 사용한것을 확인가능
export default function FunctionComponentPage() {
  const [isChange, setIsChange] = useState(false);
  const router = useRouter();

  useEffect(() => {
    alert("Rendered!!");
  }, []);

  useEffect(() => {
    alert("Changed!!");
  }, [isChange]);

  useEffect(() => {
    return () => {
      alert("Bye!!");
    };
  }, []);

  const onClickEdit = () => {
    console.log(isChange);
    setIsChange((prevIsChange) => !prevIsChange);
  };

  const onClickMove = () => {
    router.push("/");
  };

  return (
    <>
      <button onClick={onClickEdit}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </>
  );
}

/*
useEffect()
  : class componet의 라이프사이클 메서드와 비슷한 기능을 제공

/// 기본 사용법
 useEffect(() => {
    // 작업 내용...
    return () => {
      // Clean-up 함수 (componentWillUnmount 역할)
    };
  }, [ 의존성 배열 ]);

기본적으로 마운트 또는 업데이트된 후 실행이 되고 두번째 인자로 의존성배열을 받는데
이 의존성 배열에 지정된 상태 또는 프로퍼티가 변경될 때만 useEffect() 안의 함수가 다시 실행
비어있으면 컴포넌트가 처음 렌더링될 때만 한 번 실행
*/
