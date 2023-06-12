import { useState } from "react";
import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  padding-left: 0px;
`;

const Wrapper = styled.table`
  width: 700px;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  padding: 10px;
  text-align: center;
`;

const TableHeader = styled.tr`
  border-top: 1px solid #999999;
  background-color: #eeeeee;
  height: 50px;
`;
const Tabledata = styled.td`
  border-top: 1px solid #999999;
  border-bottom: 1px solid #999999;
  padding: 20px 0 20px 0;
`;

const DeleteBtn = styled.button`
  border-radius: 20px;
  width: 150px;
  height: 35px;
  background-color: hotpink;
  color: white;
  border: 0px;
  margin: 15px 0px;
`;

export default function boardData() {
  const dataList = [
    { id: 1, data: "9월달 시스템 점검 안내입니다.", date: "2020.09.19" },
    { id: 2, data: "안녕하세요! 공지사항 전달드립니다.", date: "2020.09.17" },
    { id: 3, data: "개인정보 처리방침 변경 사전 안내", date: "2020.09.12" },
    { id: 4, data: "ios 10.0이하 지원 중단 안내", date: "2020.08.10" },
    { id: 5, data: "이용약관 변경 사전 안내", date: "2020.08.01" },
    { id: 6, data: "개인정보 처리방침 변경 사전 안내", date: "2020.07.19" },
  ];

  const [checkList, setCheckList] = useState([]);

  const onClickCheckAll = () => {
    if (checkList.length !== dataList.length) {
      setCheckList(dataList);
    } else {
      setCheckList([]);
    }
  };

  const onCheckedItem = (list) => {
    if (checkList.every((cur) => cur.id !== list.id)) {
      setCheckList([...checkList, list]);
    } else {
      const result = checkList.filter((cur) => cur.id !== list.id);
      setCheckList(result);
    }
  };

  const isChecked = (list) => {
    return checkList.some((cur) => cur.id === list.id);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <TableHeader>
            <th>
              <input
                type="checkbox"
                onClick={onClickCheckAll}
                checked={checkList.length === dataList.length}
              ></input>
            </th>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </TableHeader>

          {dataList.map((list, index) => (
            <TableRow key={index}>
              <Tabledata>
                <input
                  type="checkbox"
                  onChange={() => onCheckedItem(list)}
                  checked={isChecked(list)}
                />
              </Tabledata>
              <Tabledata>{list.id}</Tabledata>
              <Tabledata>{list.data}</Tabledata>
              <Tabledata>{list.date}</Tabledata>
            </TableRow>
          ))}
        </Wrapper>

        <DeleteBtn>선택삭제</DeleteBtn>
      </Container>
    </>
  );
}
