import React from "react";
import { useState } from "react";

import RightHalf from "./RightHalf";
import LeftHalf from "./LeftHalf";
function Body() {
  
  return (
    <div class="page-section border-bottom-2">
      <div class="container page__container">
        <div class="row">
          <LeftHalf></LeftHalf>
          <RightHalf></RightHalf>
        </div>
      </div>
    </div>
  );
}

export default Body;
