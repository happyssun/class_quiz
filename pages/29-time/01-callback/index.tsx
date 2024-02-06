import axios from "axios";

export default function CallbackFreiendsPage(): JSX.Element {
  const onClickCallback = () => {
    const aa = new XMLHttpRequest();
    aa.open("get", `http://numberapi.com/random?min=1&max=200`);
    aa.send(); // 요청하기
    aa.addEventListener("load", (res) => {
      console.log(res); // API 요청 결과
      const num = res.target.response.split("")[0];

      const bb = new XMLHttpRequest();
      bb.open("get", `https://koreanjson.com/posts/${num}`);
      bb.send();
      bb.addEventListener("load", (res) => {
        console.log(res);
        const userId = JSON.parse(res.target.response).UserId; // 작성자 ID

        const cc = new XMLHttpRequest();
        cc.open("get", `https://koreanjson.com/posts/?userId=${userId}`);
        cc.send();
        cc.addEventListener("load", (res) => {
          console.log(res); // 최종 API 요청 결과
        });
      });
    });
  };

  const onClickPromise = () => {
    console.log("1번째 실행");
    axios
      .get("http://numberapi.com/random?min=1&max=200")
      .then((response) => {
        console.log("2번째 실행");
        const num = response.data.split("")[0];
        return axios.get(`https://koreanjson.com/posts/${num}`);
      })
      .then((response) => {
        console.log("3번째 실행");
        return axios.get(
          `https://koreanjson.com/posts/?userId=${response.data.UserId}`
        );
      })
      .then((response) => {
        console.log("4번째 실행");
        console.log("최종 결과 값!!!!");
        console.log(response);
      });
    console.log("5번째 실행");
  };

  const onClickAsyncAwait = async () => {
    try {
      const response1 = await axios.get(
        "http://numberapi.com/random?min=1&max=200"
      );
      console.log("2번째 실행");
      const num = response1.data.split("")[0];
      const response2 = await axios.get(`https://koreanjson.com/posts/${num}`);
      console.log("3번째 실행");
      const response3 = await axios.get(
        `https://koreanjson.com/posts/?userId=${response2.data.UserId}`
      );
      console.log("4번째 실행");
      console.log("최종 결과 값!!!!");
      console.log(response3);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <button onClick={onClickCallback}>Callback 연습하기!</button>
      <button onClick={onClickPromise}>Promise 연습하기!</button>
      <button onClick={onClickAsyncAwait}>AsyncAwait 연습하기!</button>
    </>
  );
}
