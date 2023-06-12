import styled from "@emotion/styled";
import { useState } from "react";

const StarPoint = [1, 2, 3, 4, 5];

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const Wrapper = styled.div`
    display: flex;
  `;

  const TempStar = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${(props: { active: boolean }) =>
      props.active ? "/img/yellowStar.png" : "/img/grayStar.png"});
    background-position: center;
    background-repeat: no-repeat;
  `;

  const ResultScore = styled.div`
    font-weight: bold;
  `;

  const onClickStar = (num) => {
    setRating(num);
  };

  return (
    <>
      <Wrapper>
        {StarPoint.map((num) => {
          return (
            <TempStar active={num <= rating} onClick={() => onClickStar(num)} />
          );
        })}
      </Wrapper>
      <ResultScore>{rating}점</ResultScore>
    </>
  );
};
export default StarRating;
