const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.getElementById("line-width");
const widthValue = document.getElementById("width-value");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
); // HTMLCollection인 값을 배열로 만들어줘야 forEach()를 사용 가능
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

// Flat UI Colors에서 색 가져옴
// const colors = [
//   "#55efc4",
//   "#81ecec",
//   "#74b9ff",
//   "#a29bfe",
//   "#dfe6e9",
//   "#00b894",
//   "#00cec9",
//   "#0984e3",
//   "#6c5ce7",
//   "#b2bec3",
//   "#ffeaa7",
//   "#fab1a0",
//   "#ff7675",
//   "#fd79a8",
//   "#636e72",
//   "#fdcb6e",
//   "#e17055",
//   "#e84393",
//   "#d63031",
//   "#2d3436",
// ];

// function sample(event) {
//   // console.log(event)를 찍어서 확인해보면 event 정보값 중에 offsetX, offsetY가 우리에게 필요한 canvas 내 좌표임을 알 수 있다.
//   ctx.beginPath(); // 매번 경로를 새로 해주지 않으면 모든 선의 색이 바뀐다.
//   ctx.moveTo(0, 0); // moveTo를 주면 캔버스 시작점에서부터 선을 그릴 수 있게 된다.
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("mousemove", sample);
// click 이벤트를 주면 클릭 시 그려지고, mousemove를 주면 마우스 포인터가 움직일 때마다 그려진다.

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return; // 함수 끝내는 목적
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

let isPainting = false;

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath(); // 경로를 끊어줘야 굵기를 변경했을 때 이전의 선까지 같이 변하지 않는다.
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 위 코드만 작성하면 마우스를 누른 채로 포인터가 캔버스 밖으로 나갔을 때 mouseup 이벤트가 발생하지 않게 되어, 다시 캔버스로 포인터가 돌아가면 클릭하지 않아도 그냥 선이 그려지는 버그가 생긴다. 이를 막기 위해 캔버스 밖으로 나가면 변수를 바꿔주는 이벤트를 추가하면 된다.
canvas.addEventListener("mouseleave", cancelPainting);

// 아니면 그냥 아래와 같이 mouseup 이벤트를 document에 주면 된다.
// document.addEventListener("mouseup", onMouseUp);

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
lineWidth.addEventListener("change", onLineWidthChange);

// range 옆에 굵기 몇인지 보이게 하고 싶어서 추가함
function onShowValue(e) {
  widthValue.innerText = e.target.value;
}
lineWidth.addEventListener("input", onShowValue);

function changeStyle(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function onColorChange(event) {
  changeStyle(event.target.value);
}
color.addEventListener("change", onColorChange);

function onColorClick(e) {
  changeStyle(e.target.dataset.color);
  color.value = e.target.dataset.color; // 사용자가 색상이 변경된 걸 알 수 있도록 처리
}
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

let isFilling = false;

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "브러시";
  } else {
    isFilling = true;
    modeBtn.innerText = "페인트통";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);

function onResetClick() {
  /* 주석 처리한 건 강의에서 알려준 방식. 하얀 사각형으로 전체를 덮어씌우는 것 */
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  /* 아래는 해당 강의 댓글에 다른 사람이 남겨놓은 것. clearRect는 특정 영역을 투명하게 지워버리는 메소드다. body에 배경색이 따로 있으면 그 색으로 나오는 것 확인함. */
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
resetBtn.addEventListener("click", onResetClick);

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "브러시";
}
eraserBtn.addEventListener("click", onEraserClick);

function onFileChange(event) {
  // files가 배열 형태인 이유는 input에 multiple 속성을 넣을 수 있기 때문이다. multiple 속성을 해두면 여러 개의 파일을 업로드할 수 있다.
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  // console.log(url)을 찍었을 때 나오는 blob:http://127.0.0.1:5500/8084aa87-faa2-4405-be56-4aca94ae4793 <- 이것은 실제 인터넷에 존재하는 url이 아니고 파일을 업로드한 브라우저에서만 접근 가능. 브라우저 메모리에 저장된 파일을 URL을 통해 접근하는 것이다.

  // new Image()는 document.createElement("img")와 기능적으로 완전히 동일하다.
  const image = new Image();
  image.src = url;
  // 엘리먼트에 이벤트를 추가하는 방법으로 이렇게도 가능하다.
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
fileInput.addEventListener("change", onFileChange);

// 텍스트 기능
ctx.font = "30px serif";

function onDoubleClick(event) {
  /* strokeText()는 테두리 있고 안은 비어있는 글자를 만든다. 지정한 색은 테두리 색이 됨. strokeText만 하면 lineWidth에 영향을 받아서 글씨가 두꺼워진다. 그래서 save, restore 함수를 사용해 기존 설정을 저장&복구시킨 뒤 텍스트를 입력할 때 lineWidth 설정을 변경하는 식으로 한다.
  fillText()은 색을 전부 채운 글자를 만든다. fillText는 lineWidth에 영향을 받지 않는다.
  두 가지 메소드 전부 페인트통 모드일 때는 더블 클릭이 아니라 클릭 이벤트가 적용되어 텍스트 입력이 안 된다. 근데 강의에서는 이미지 위에 텍스트를 얹는 상황을 가정하고 만들기 때문에 여기까지는 신경 쓰지 않는 듯.
   */
  const text = textInput.value;

  // strokeText로 할 경우 코드
  // if (text !== "") {
  //   // save : ctx의 색상, 스타일 등 현재 상태를 저장한다.
  //   ctx.save();
  //   ctx.lineWidth = 2;
  //   ctx.strokeText(text, event.offsetX, event.offsetY);
  //   // restore : 저장된 상태로 돌아간다.
  //   ctx.restore();
  // }

  // fillText로 할 경우 코드
  if (text !== "") {
    ctx.fillText(text, event.offsetX, event.offsetY);
  }
}
canvas.addEventListener("dblclick", onDoubleClick);

function onSaveClick() {
  // canvas.toDataURL : 캔버스에 있는 그림 데이터를 URL로 변환해주는 메소드. 결과값은 캔버스에 그린 그림을 문자열로 나타낸 것이다.
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  // 앵커 태그의 download 속성은 브라우저에게 href에 링크된 콘텐츠를 브라우저에 표시하지 말고 다운로드하라고 지시하는 역할을 한다. download에 값을 줄 경우 기본 파일명을 지정할 수 있다.
  a.download = "myDrawing.png";
  a.click(); // 클릭 이벤트를 실행시키는 메소드
}
saveBtn.addEventListener("click", onSaveClick);
