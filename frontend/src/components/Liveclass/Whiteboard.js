import React from 'react'

const Whiteboard = () => {
  return (
    <div class="whiteboard-cont">
      <canvas id="whiteboard" height="1000" width="1000"></canvas>
      <div class="colors-cont">
        <div class="black" onclick="setColor('black')"></div>
        <div class="red" onclick="setColor('#e74c3c')"></div>
        <div class="yellow" onclick="setColor('#f1c40f')"></div>
        <div class="green" onclick="setColor('#badc58')"></div>
        <div class="blue" onclick="setColor('#3498db')"></div>
        <div class="orange" onclick="setColor('#e67e22')"></div>
        <div class="purple" onclick="setColor('#9b59b6')"></div>
        <div class="pink" onclick="setColor('#fd79a8')"></div>
        <div class="brown" onclick="setColor('#834c32')"></div>
        <div class="grey" onclick="setColor('gray')"></div>
        <div class="eraser" onclick="setEraser()">
          <i class="fas fa-eraser"></i>
        </div>
        <div class="clearboard" onclick="clearBoard()">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default Whiteboard