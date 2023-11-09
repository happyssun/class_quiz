import Head from "next/head";
import { useEffect, useState } from "react";

// 글로벌 스코프에 위치한 kakao라는 객체의 타입 지정
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMap() {
  // 클릭한 곳의 좌표를 보여주기 위해
  const [clickedLatLng, setClickedLatLng] = useState({ lat: null, lng: null });

  // useEffect()없이 할 경우 document객체에서 에러발생
  // 이유는 서버사이드 렌더링 특징중에 하나로 프론트엔드 서버에서 페이지가 그려지는 시점는 documnet가 undefined이기 떄문
  // 그래서 useEffect를 이용해 페이지가 마운트되고 document 객체가 생성된 이후에 카카오맵을 호출할 수 있도록 변경
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커 이미지 변경
    const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
      imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new window.kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        setClickedLatLng({
          lat: latlng.getLat().toFixed(5), // 소수점 5자리까지 반올림해서 보여주게
          lng: latlng.getLng().toFixed(5),
        });
      }
    );
  }, []);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4e2f9fc2515fd2b69162c4044bee0caa"
        ></script>
      </Head>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <div>
        {" "}
        {clickedLatLng.lat && clickedLatLng.lng
          ? `클릭한 위치의 위도는 ${clickedLatLng.lat}이고, 경도는 ${clickedLatLng.lng}입니다`
          : "맵을 클릭해주세요"}
      </div>
    </>
  );
}
