const canvas = document.querySelector("canvas");

// 맥락을 뜻하는 context가 canvas에서는 브러쉬의 형태로 나오게 된다.
const ctx = canvas.getContext("2d");

// CSS에서 캔버스 크기를 지정해줬지만 JS에게도 캔버스의 크기를 알려줘야 한다.
canvas.width = 800;
canvas.height = 800;

// 캔버스의 좌표 시스템은 보통 그렇듯 좌측 상단(x:0, y:0)에서 시작한다.
// fillRect : 색이 채워진 사각형을 그리는 숏컷 메소드
// strokeRect : 색을 채우지 않고 선으로 된 사각형을 그리는 숏컷 메소드
ctx.fillRect(50, 50, 100, 100);

// 위의 숏컷은 원래 이런 과정을 거친다.
ctx.rect(250, 50, 100, 100); // 선 만들기
ctx.rect(150, 150, 100, 100);
ctx.fill(); // 영역 색 채우기
ctx.rect(250, 250, 100, 100);
ctx.stroke(); // 선 색 넣기
// stroke()를 하면 strokeRect가 된다.

// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();
/* 이렇게 하면 fillRect로 만든 사각형 빼고 전부 다 빨강으로 채워진다. stroke로 만든 사각형 역시 빨강으로 채워진다.
그 이유는 위의 것들이 전부 같은 경로(path)의 일부이기 때문이다.
(setTimeout으로 시간차를 줘도 계속 같은 경로인 상태이므로 마찬가지임) */

// 새로운 경로를 만들면 이 정사각형만 빨강으로 채워진다.
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();
