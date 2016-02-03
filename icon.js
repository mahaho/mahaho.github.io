var eBoardWidth = 3;
var eBoardHeight= 1;
var eSquareWidth = 50;
var eSquareHeight= 50;
var ePixelWidth = 1 + (eBoardWidth * eSquareWidth);
var ePixelHeight= 1 + (eBoardHeight * eSquareHeight);

var eCanvasElement;
var eDrawingContext;
var Pattern;
var egSelectedCircleIndex;
var gSelectedCircleHasMoved;
var egNumCircle;
var egCircle;

var einGameTrian;

var einGameCircle;

var einGameSquare;







function eCell(row, column) {
    this.row = row;
    this.column = column;
}


function einitBoard(){
    eCanvasElement = document.getElementById("canvas_icon");

    eCanvasElement.width = ePixelWidth;
    eCanvasElement.height = ePixelHeight;
    eCanvasElement.addEventListener("click", elemOnClick, false);
    eDrawingContext = eCanvasElement.getContext("2d");
    egCircle = [new Cell(eBoardHeight - 1, 2),
        new Cell(eBoardHeight - 1, 1),
        new Cell(eBoardHeight - 1, 0)];
    egNumCircle = egCircle.length;
    egSelectedCircleIndex=-1;
    einGameTrian=-1;

    einGameCircle=-1;

    einGameSquare=-1;
    edrawBoard();

}

function edrawBoard (){

    eDrawingContext.clearRect(0, 0, ePixelWidth, ePixelHeight);

    eDrawingContext.beginPath();

    /* верт линии */
    for (var x = 0; x <= ePixelWidth; x += eSquareWidth) {
        eDrawingContext.moveTo(0.5 + x, 0);
        eDrawingContext.lineTo(0.5 + x, ePixelHeight);
    }

    /* гориз линии */
    for (var y = 0; y <= ePixelHeight; y += eSquareHeight) {
        eDrawingContext.moveTo(0, 0.5 + y);
        eDrawingContext.lineTo(ePixelWidth, 0.5 +  y);
    }


    /* рисуем */
    eDrawingContext.estrokeStyle = "";
    eDrawingContext.stroke();

 //   for (var i = 0; i < 10; i++) {
//        edrawCircle(egCircle[i], i == egSelectedCircleIndex);
 //   }
  //  for (var i = 0; i < 1; i++) {
  //      edrawTrian(egCircle[i], i == egSelectedCircleIndex);
  //  }
    if (einGameCircle==-1){
    for (var i = 0; i < 1; i++) {
        edrawCircle(egCircle[i], i == egSelectedCircleIndex);
    }}
    if (einGameSquare==-1){
    for (var i = 1; i < 2; i++) {
        edrawCub(egCircle[i], i == egSelectedCircleIndex);
    }}
    if (einGameTrian==-1){
    for (var i = 2; i < 3; i++) {
        edrawTrian(egCircle[i], i == egSelectedCircleIndex);
    }}

}

function edrawCircle(c, selected) {
    var column = c.column;
    var row = c.row;
    var x = (column * eSquareWidth) + (eSquareWidth/2);
    var y = (row * eSquareHeight) + (eSquareHeight/2);
    var radius = (eSquareWidth/2) - (eSquareWidth/10);
    eDrawingContext.beginPath();
    eDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
    eDrawingContext.closePath();
    eDrawingContext.strokeStyle = "#000";
    eDrawingContext.stroke();
    if (selected) {
        eDrawingContext.fillStyle= "rgb(78, 193, 243)";
        eDrawingContext.fill();
    }
}


function edrawTrian(c, selected) {
    var column = c.column;
    var row = c.row;
    var x = ((column * eSquareWidth) + (eSquareWidth/2))-25;
    var y = ((row * eSquareHeight) + (eSquareHeight/2))-25;
    eDrawingContext.beginPath();
    eDrawingContext.moveTo(x+5,y+5);
    eDrawingContext.lineTo(x+45, y+5);


    eDrawingContext.lineTo(x+25, y+45);


  //  eDrawingContext.lineTo(120, 25);
    eDrawingContext.closePath();
    eDrawingContext.stroke();
    if (selected) {
        eDrawingContext.fillStyle= "rgb(78, 193, 243)";
        eDrawingContext.fill();
    }
}


function edrawCub(c, selected) {
    var column = c.column;
    var row = c.row;
    var x = ((column * eSquareWidth) + (eSquareWidth/2))-25;
    var y = ((row * eSquareHeight) + (eSquareHeight/2))-25;
    eDrawingContext.beginPath();
    eDrawingContext.moveTo(x+5,y+5);
    eDrawingContext.lineTo(x+45, y+5);

    //Вторая линия

    eDrawingContext.lineTo(x+45, y+45);
    eDrawingContext.lineTo(x+5, y+45);

    //Третья линия

    //  eDrawingContext.lineTo(120, 25);
    eDrawingContext.closePath();
    eDrawingContext.stroke();
    if (selected) {
        eDrawingContext.fillStyle= "rgb(78, 193, 243)";
        eDrawingContext.fill();
    }
}


function elemOnClick(e) {
    var cell = egetCursorPosition(e);
    for (var i = 0; i < egNumCircle; i++) {
        if ((egCircle[i].row == cell.row) &&
            (egCircle[i].column == cell.column)) {
            eclickOnCircle(i);
            return;
        }
    }
    eclickOnEmptyCell(cell);
}

function eclickOnCircle(circleIndex) {
    if (einGameCircle == circleIndex || einGameSquare==circleIndex || einGameTrian==circleIndex) {


        return;
    }
    if (egSelectedCircleIndex == circleIndex) {

        egSelectedCircleIndex=-1;
        edrawBoard();
        return;
    }
    egSelectedCircleIndex = circleIndex;
    // gSelectedCircleHasMoved = false;
    edrawBoard();
}

function egetCursorPosition(e) {
    gclearSelected();
    /* возвращает в cell строку и колонку */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= eCanvasElement.offsetLeft;
    y -= eCanvasElement.offsetTop;
    x = Math.min(x, eBoardWidth * eSquareWidth);
    y = Math.min(y, eBoardHeight * eSquareHeight);

    var cell = new Cell(Math.floor(y/eSquareHeight), Math.floor(x/eSquareWidth));

    var text = document.getElementById("check");
    text.innerHTML = Math.floor(y/eSquareHeight)+"_"+ Math.floor(x/eSquareWidth);
    return cell;
}

function checkSelectElem(){
      return egSelectedCircleIndex;
}

function clearSelect(){
    switch (checkSelectElem()){
        case 0:
            einGameCircle=0;
            break
        case 1:
            einGameSquare=1;
            break
        case 2:
            einGameTrian=2;
            break
    }
    egSelectedCircleIndex=-1;

    edrawBoard();
}