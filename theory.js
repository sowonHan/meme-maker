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

// fillRect는 아래와 같은 과정을 거친다.
ctx.rect(250, 50, 100, 100); // 선 만들기
ctx.rect(150, 150, 100, 100);
ctx.fill(); // 영역 색 채우기
ctx.rect(250, 250, 100, 100);
ctx.stroke(); // 선 색 넣기
// stroke()를 하면 strokeRect가 된다.

ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();
/* 이렇게 하면 fillRect로 만든 사각형 빼고 전부 다 빨강으로 채워진다. stroke로 만든 사각형 역시 빨강으로 채워진다.
그 이유는 위의 것들이 전부 같은 경로(path)의 일부이기 때문이다.
(setTimeout으로 시간차를 줘도 계속 같은 경로인 상태이므로 마찬가지임) */

// 새로운 경로를 만들면 이 정사각형만 빨강으로 채워진다.
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

// 근데 rect()도 사실은 숏컷 함수다. 원래는 이런 과정을 거친다.
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.stroke(); // fill()을 사용하면 검은색으로 채워짐

// 집 만들기
ctx.fillRect(100, 200, 50, 200); // 벽1
ctx.fillRect(300, 200, 50, 200); // 벽2
ctx.fillRect(200, 300, 50, 100); // 문
ctx.fillRect(100, 200, 200, 20); // 천장
ctx.moveTo(100, 200);
ctx.lineTo(225, 100);
ctx.lineTo(350, 200);
ctx.fill(); // 지붕

// 사람 만들기
ctx.fillRect(450, 200, 15, 100); // 팔1
ctx.fillRect(615, 200, 15, 100); // 팔2
ctx.fillRect(510, 200, 60, 200); // 몸통
// 경로를 새로 만들지 않으면 context가 지붕에서 이어져서 자꾸 삼각형이 생기더라. 강의에서는 집 모양 코드를 다 없애고 시작해서 해당 내용이 나오지 않음.
ctx.beginPath();
/* arc : 원을 그리는 메소드
endAngle을 자유롭게 설정할 수 있어서 완벽한 원을 만들지 않아도 된다는 것을 알 수 있다.
https://www.w3schools.com/tags/canvas_arc.asp */
ctx.arc(540, 130, 50, 0, 2 * Math.PI); // 머리
ctx.fill();
// 눈 만들기
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(520, 130, 5 + 3, 0, 2 * Math.PI);
ctx.arc(560, 130, 5 + 3, Math.PI, 2 * Math.PI);
ctx.fill();
