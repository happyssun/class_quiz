import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  background-color: pink;
  height: 250px;
`;

const SlideItems = styled.img`
  margin: auto;
`;

export default function LayoutBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SlideItems src="/img/carousel/dog1.jpeg" />
        </div>
        <div>
          <SlideItems src="/img/carousel/dog2.jpeg" />
        </div>
        <div>
          <SlideItems src="/img/carousel/dog3.jpeg" />
        </div>
      </Slider>
    </Wrapper>
  );
}
