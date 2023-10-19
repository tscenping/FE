

export default function Game(){
  const canvas = document.querySelector("#canvas");

  return (<div>
    <canvas id="canvas">
      
	canvas를 지원하지 않는 브라우저에서는 캔버스 대신 태그 사이 내용이 표시
</canvas>
<canvas id="canvas" width="500" height="500"></canvas>
		// 500픽셀 * 500픽셀로 설정

<canvas id="canvas" width="50vw" height="40vh"></canvas>
		// vw, vh를 전달했지만 50픽셀 * 40픽셀로 설정
  </div>)
}