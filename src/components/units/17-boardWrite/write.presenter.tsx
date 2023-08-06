import Uploads01 from "../../commons/uplaods/01/uploads01.container";

export default function UploadWriteUI(props) {
  return (
    <>
      <div>
        {/* 항상 3개의 컴포넌트가 뿌려집니다.
      이미지를 보여줄지, 추가 버튼을 보여줄지는 안에서 조건부로 구분합니다. */}

        {new Array(3).fill(1).map((data, index) => (
          <Uploads01
            key={`${data}_${index}`}
            index={index}
            onChangeFiles={props.onChangeFiles}
            fileUrls={props.fileUrls}
          />
        ))}
      </div>
    </>
  );
}
