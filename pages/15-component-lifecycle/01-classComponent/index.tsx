import Router from "next/router";
import { Component } from "react";

export default class Page extends Component {
  state = {
    isChange: false,
  };

  // 처음 마운트될때
  componentDidMount(): void {
    alert("Rendered!!");
  }

  // 밑의 내용 참조
  componentDidUpdate(prevProps, prevState): void {
    if (prevState.isChange !== this.state.isChange) {
      alert("Changed!!");
      console.log(this.state.isChange);
    }
  }
  componentWillUnmount(): void {
    alert("Bye!!");
  }

  // 이벤트 핸들러 함수에서 클래스 컴포넌트의 this를 참조하게 하려면
  // 화살표 함수를 사용해야함
  /* 1. 항상 고정값으로 버튼을 누르면 변경된 상태로만
      onClickEdit = () => {
        this.setState({
          isChange: true,

        });
        };
  */
  // 2. 버튼을 누를때마다 상태 변경
  onClickEdit = () => {
    this.setState((prevState) => ({
      isChange: !prevState.isChange, // 이전 값의 반대로 변경
    }));
  };

  onClickMove() {
    Router.push("/");
  }

  render() {
    return (
      <>
        <button onClick={this.onClickEdit}>변경</button>
        <button onClick={this.onClickMove}>이동</button>
      </>
    );
  }
}

/*
만약 이부분을 if (prevState.isChange !== this.state.isChange && this.state.isChange)게 한다면
  - 현재 상태의 isChange 값과 이전 상태의 isChange 값을 비교하는 것 : isChange 값이 변경되었는지를 확인

두번째의, this.state.isChange는 현재 상태의 isChange 값
이것을 && (논리 AND) 연산자와 함께 사용하여, 이 조건이 true인 경우에만 다음과 같은 결과가 발생

true && true: 이 경우에만 true를 반환
나머지는 전부 false
false && true: false 
false && false: false 
true && false: false
따라서, prevState.isChange !== this.state.isChange && this.state.isChange은 
현재 isChange 값이 이전과 다른(변경된) 상태인 경우에만 true를 반환 */

/* 
componentDidUpdate 메서드에서 prevProps를 인자로 받은 이유
 렌더링과 현재 렌더링 사이의 변경사항을 확인하는 데 사용. 
 이전 props와 현재 props를 비교함으로써 어떤 props의 값이 변경되었는지를 파악

prevProps는 이전 렌더링 때의 props 객체, prevState는 이전 렌더링 때의 state 객체
따라서 이전 props와 state를 활용하여 리렌더링 이후에 변경된 부분을 확인하고, 필요한 로직을 수행 가능

예를 들어, componentDidUpdate 메서드에서
이전 props와 현재 props를 비교하여 특정 props가 변경되면 특정 동작을 수행가능하도록
또는 prevState와 현재 state를 비교하여 state가 변경되었을 때에만 어떤 로직을 실행시킬수 있게 할수있다. 
이러한 기능들을 통해 리렌더링 이후에 필요한 동작을 처리가능
*/
