import React from "react";
import ReactPlayer from "react-player";

export default function PlayerLibrary() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=mEF9FDh4nZc"
      width={800}
      height={600}
      muted={true}
      playing={true}
      controls={true}
    />
  );
}

// react-player를 사용하여 유튜브 라이브러리 만들기
