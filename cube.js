var BoardWidth = 20;
var BoardHeight= 10;
var SquareWidth = 50;
var SquareHeight= 50;
var PixelWidth = 1 + (BoardWidth * SquareWidth);
var PixelHeight= 1 + (BoardHeight * SquareHeight);

var CanvasElement;
var DrawingContext;
var Pattern;
var gSelectedCircleIndex;
var gSelectedCircleHasMoved;
var gNumCircle;
var gCircle;
var gTrian;
var gSquare;
//////////////////
var inGameTrian;
var inGameTrianSelected;
var inGameCircle;
var inGameCircleSelected;
var inGameSquare;
var inGameSquareSelected;
//////////////////


function Cell(row, column) {
    this.row = row;
    this.column = column;
}


function initBoard(){
CanvasElement = document.getElementById("canvas_square");

    CanvasElement.width = PixelWidth;
    CanvasElement.height = PixelHeight;
CanvasElement.addEventListener("click", boardOnClick, false);
    DrawingContext = CanvasElement.getContext("2d");
    gCircle = [new Cell(BoardHeight - 1, 0),
        new Cell(BoardHeight - 2, 0),
        new Cell(BoardHeight - 3, 0)];


    gSelectedCircleIndex = -1;

    inGameTrian = -1;
    inGameCircle = -1;
    inGameSquare = -1;
   inGameTrianSelected= -1;

     inGameCircleSelected= -1;

     inGameSquareSelected= -1;
    gNumCircle = gCircle.length;

    drawBoard();

}

function drawBoard (cell){

    DrawingContext.clearRect(0, 0, PixelWidth, PixelHeight);

    DrawingContext.beginPath();

    /* верт линии */
    for (var x = 0; x <= PixelWidth; x += SquareWidth) {
        DrawingContext.moveTo(0.5 + x, 0);
        DrawingContext.lineTo(0.5 + x, PixelHeight);
    }

    /* гориз линии */
    for (var y = 0; y <= PixelHeight; y += SquareHeight) {
        DrawingContext.moveTo(0, 0.5 + y);
        DrawingContext.lineTo(PixelWidth, 0.5 +  y);
    }


    /* рисуем */
    DrawingContext.strokeStyle = "";
    DrawingContext.stroke();

    if (inGameCircle==0){
      //   for (var i = 0; i < 1; i++) {
      //  gCircle[0] = Cell(cell),
        if(checkSelectElem()==0) {
            gCircle[0] = cell;
        }
        drawCircle(gCircle[inGameCircle], inGameCircle==gSelectedCircleIndex);
          //   drawCircle(gCircle[i], i == gSelectedCircleIndex);
      //   }
        }

    if (inGameSquare==1){
      //  for (var i = 0; i < 1; i++) {
      //  gCircle[1] = Cell(cell),
        if(checkSelectElem()==1) {
            gCircle[1] = cell;
        }
            drawSquare(gCircle[inGameSquare], inGameSquare==gSelectedCircleIndex);
         //   drawSquare(gSquare[i], i == gSelectedCircleIndex);
    //    }
    }

    if (inGameTrian==2){
     //   for (var i = 0; i < 1; i++) {
        if(checkSelectElem()==2) {
            gCircle[2] = cell;
        }
            drawTrian(gCircle[inGameTrian], inGameTrian==gSelectedCircleIndex);
         //   drawTrian(gTrian[i], i == gSelectedCircleIndex);
      //  }
    }



}


function drawCircle(c, selected) {

    var column = c.column;
    var row = c.row;
    var x = (column * SquareWidth) + (SquareWidth/2);
    var y = (row * SquareHeight) + (SquareHeight/2);
    var radius = (SquareWidth/2) - (SquareWidth/10);
    DrawingContext.beginPath();
    DrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
    DrawingContext.closePath();
    DrawingContext.strokeStyle = "#000";
    DrawingContext.stroke();
    if (selected) {
        DrawingContext.fillStyle = "rgb(0, 255, 102)";
        DrawingContext.fill();
    }
}

function drawTrian(c, selected) {

    var column = c.column;
    var row = c.row;
    var x = ((column * SquareWidth) + (SquareWidth/2))-25;
    var y = ((row * SquareHeight) + (SquareHeight/2))-25;
    DrawingContext.beginPath();
    DrawingContext.moveTo(x+5,y+5);
    DrawingContext.lineTo(x+45, y+5);

    DrawingContext.lineTo(x+25, y+45);

    //  DrawingContext.lineTo(120, 25);
    DrawingContext.closePath();
    DrawingContext.stroke();
    if (selected) {
        DrawingContext.fillStyle= "rgb(78, 193, 243)";
        DrawingContext.fill();
    }
}

function drawSquare(c, selected) {

    var column = c.column;
    var row = c.row;
    var x = ((column * SquareWidth) + (SquareWidth/2))-25;
    var y = ((row * SquareHeight) + (SquareHeight/2))-25;
    DrawingContext.beginPath();
    DrawingContext.moveTo(x+5,y+5);
    DrawingContext.lineTo(x+45, y+5);


    DrawingContext.lineTo(x+45, y+45);
    DrawingContext.lineTo(x+5, y+45);


    //  eDrawingContext.lineTo(120, 25);
    DrawingContext.closePath();
    DrawingContext.stroke();
    if (selected) {
        DrawingContext.fillStyle= "rgb(255, 0, 196)";
        DrawingContext.fill();
    }
}

function boardOnClick(e) {
    var cell = getCursorPosition(e);
    for (var i = 0; i < gNumCircle; i++) {
        if ((gCircle[i].row == cell.row) &&
            (gCircle[i].column == cell.column)) {
            clickOnCircle(i,cell);
            return;
        }
    }
    clickOnEmptyCell(cell);
}

function clickOnCircle(circleIndex,cell) {
    if (gSelectedCircleIndex == circleIndex) {

        gSelectedCircleIndex=-1;
        drawBoard(cell);
        return;
    }
    gSelectedCircleIndex = circleIndex;
   // gSelectedCircleHasMoved = false;
    drawBoard(cell);
}
//вот тут намудрил..................................................................................,,,,,,,,,,,,,,,
function clickOnEmptyCell(cell) {

    if (gSelectedCircleIndex == -1) {
        if (checkSelectElem()==-1){
         //   var text = document.getElementById("check");
      //      text.innerHTML = checkSelectElem();
        //    drawBoard(checkSelectElem(),cell);

        }else{
            switch(checkSelectElem()){
                case 0:
                    inGameCircle=checkSelectElem();
                    break
                case 1:
                    inGameSquare=checkSelectElem();
                    break
                case 2:
                    inGameTrian=checkSelectElem();
                    break
                default:
            }
            drawBoard(cell);
            var text = document.getElementById("check");
           text.innerHTML = checkSelectElem();
            clearSelect();
            return; }

         }

    var rowDiff = Math.abs(cell.row - gCircle[gSelectedCircleIndex].row);
    var columnDiff = Math.abs(cell.column - gCircle[gSelectedCircleIndex].column);
    if ((rowDiff <= 30) &&
        (columnDiff <= 30)) {
        gCircle[gSelectedCircleIndex].row = cell.row;
        gCircle[gSelectedCircleIndex].column = cell.column;


        drawBoard(cell);
        return;
    }


}

function getCursorPosition(e) {
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
    x -= CanvasElement.offsetLeft;
    y -= CanvasElement.offsetTop;
    x = Math.min(x, BoardWidth * SquareWidth);
    y = Math.min(y, BoardHeight * SquareHeight);

    var cell = new Cell(Math.floor(y/SquareHeight), Math.floor(x/SquareWidth));

    var text = document.getElementById("check");
   // text.innerHTML = Math.floor(y/SquareHeight)+"_"+ Math.floor(x/SquareWidth);
    return cell;
}