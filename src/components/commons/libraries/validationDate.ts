// 마지막 날짜 구하기
// 입력받은 날짜의 월과 일을 검증할 때, 마지막 월과 일을 초과해서 날짜를 설정하면 안되게 하기위해서
// 예) 1999.34.50 -> 1999.12.31 이렇게 설정되도록
// 여기서 월을 마지막 날짜로 해서 가져오는 이유는 : 브라우저 내장함수가 이미 어떤달이 30일인지 31일인지 알고있어서
const getLastDate = (yyyy: string, mm: string): number => {
  if (Number(mm) === 12) {
    return new Date(Number(yyyy) + 1, 0, 0).getDate();
  }
  return new Date(Number(yyyy), Number(mm), 0).getDate();
};

// 정규 표현식
export const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;

// 검증된 날짜 구하기
export const getValidDate = (dottedValue: string[]) => {
  let [yyyy, mm, dd] = dottedValue
    .join("")
    .split(".")
    .filter((data) => data !== "")
    .map((data) => data);
  mm = Number(mm) > 12 ? "12" : mm; // 12월보다 크면 12가 되게 : 숫자(mm)과 12를 비교한뒤 다시 문자열'12'로
  dd =
    Number(dd) > getLastDate(yyyy, mm) ? getLastDate(yyyy, mm).toString() : dd;
  return (
    yyyy +
    (mm ? `.${String(mm).padStart(2, "0")}` : "") +
    (dd ? `.${String(dd).padStart(2, "0")}` : "")
  );
};
