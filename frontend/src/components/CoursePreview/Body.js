import React from "react";
import { useState } from "react";

import RightHalf from "./RightHalf";
import LeftHalf from "./LeftHalf";
function Body({details}) {
  
  return (
    <div class="page-section border-bottom-2">
      <div class="container page__container">
        <div class="row">
          <LeftHalf details={details}></LeftHalf>
          <RightHalf details={details}></RightHalf>
        </div>
      </div>
    </div>
  );
}

export default Body;
