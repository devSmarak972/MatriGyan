import React from "react";
import { useState } from "react";

import RightHalf from "./RightHalf";
import LeftHalf from "./LeftHalf";
function Body(props) {
  const [enrolled, setEnrolled] = useState(props.isEnrolled);
  return (
    <div class="page-section border-bottom-2">
      <div class="container page__container">
        <div class="row">
          <LeftHalf {...props} enrolled={enrolled}></LeftHalf>
          <RightHalf {...props} setEnrolled={setEnrolled}></RightHalf>
        </div>
      </div>
    </div>
  );
}

export default Body;
