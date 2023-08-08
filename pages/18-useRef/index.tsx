import { Input } from "antd";
import { useEffect, useRef } from "react";

export default function UseRefPage() {
  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  // 커서의 스타일을 변경을 하고 싶은경우 이렇게 따로 스타일을 만들어서
  // 이것을 스프레드 연산자로 사용하면 쉽게 추가 가능
  const cursorStyle = {
    color: "orange",
  };

  return (
    <>
      비밀번호 :
      <Input
        type="password"
        style={{ width: "300px", marginLeft: "8px", ...cursorStyle }}
        ref={passwordRef}
      ></Input>
    </>
  );
}

/* 스프레드 연산자 사용이유 :코드의 유연성과 확장성을 높이기 위함
1. 확장성: 
  - cursorStyle 객체가 추가 속성을 가질 가능성이 있다면, 
  스프레드 연산자를 사용하면 새로운 속성이 추가될 때마다 코드를 수정할 필요 없이 자동으로 적용됩니다.

2. 가독성: 
  - 스프레드 연산자를 사용하면 속성을 한 곳에서 관리할 수 있기 때문에 코드가 더 간결하고 읽기 쉬워집니다.

3. 병합:
  - 스프레드 연산자를 사용하면 기존의 스타일 속성과 함께 속성을 병합하여 사용할 수 있습니다.
  이를 통해 기존 스타일을 유지하면서 필요한 변경을 쉽게 추가할 수 있습니다.

4. Destructuring: 
  - 객체 분해 할당(destructuring assignment)을 통해 필요한 속성만 추출하여 사용할 수도 있습니다. 
    예를 들어, const { caretColor } = cursorStyle;과 같이 할당하여 필요한 속성만 변수로 사용할 수 있습니다.

5. 일관성: 
  - 코드에서 스프레드 연산자를 사용하면 다양한 유형의 스타일 속성을 동일한 방식으로 관리할 수 있습니다. 
  예를 들어, 여러 개의 스타일 객체를 합칠 때도 동일한 방식으로 사용할 수 있습니다.
*/
