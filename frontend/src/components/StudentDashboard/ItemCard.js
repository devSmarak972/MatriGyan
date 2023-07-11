import React from "react";

const ItemCard = ( props ) => {
  
  var border = "border-l-info";
  console.log(props)
  if(props.tags){

    if(props.tags.includes("JEE"))border="border-l-secondary";
    if(props.tags.includes("NEET"))border="border-l-warning";
  }
  return (
    <div class="itemCard flex flex-grow align-items-center">
      <div
        class={
          "flex flex-col justify-between border-4 border-transparent px-4 " +
        border
        }>
        <div>
          <p class="text-base font-medium text-slate-600 dark:text-navy-100 mb-0">
            {props?.title}
          </p>
          <p class="text-xs text-slate-400 dark:text-navy-300 mb-1">
            {props?.educator}
          </p>
          {props?.tags?.map(tag => {
            return (
              <div class="badge mt-2 mx-1 bg-info/10 text-info dark:bg-info/15">
                {tag}
              </div>
            );
          })}
        </div>
      </div>
      <span class="px-3">
        <i class="fa fa-chevron-right"></i>
      </span>
    </div>
  );
};

export default ItemCard;
