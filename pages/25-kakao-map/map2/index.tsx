import Link from "next/link";
// import { useRouter } from "next/router";

export default function KaKaoMapMove() {
  // const router = useRouter();
  // const onClickMoveToMap = () => router.push("/25-kakao-map/map1");

  return (
    <>
      {/* <button onClick={onClickMoveToMap}>카카오맵으로 이동</button> */}
      <Link href="/25-kakao-map/map1">
        <a>카카오맵으로 이동하기!!</a>
      </Link>
    </>
  );
}

/*
router로 이동하면 작동 안됨 - 이부분은 class폴더의 section25 참고
SPA와 MPA 알아보기
*/
