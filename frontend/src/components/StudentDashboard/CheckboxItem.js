import React from 'react'

const CheckboxItem = ({props}) => {
  return (
    <label class="inline-flex items-center space-x-2">
      <input
        class="form-checkbox is-outline h-5 w-5 rounded bg-slate-100 border-slate-400/70 before:!bg-success checked:!border-success hover:!border-success focus:!border-success dark:bg-navy-900 dark:border-navy-500"
        type="checkbox"
      />
      <div class="my-0 mx-2 pb-2">
        <p class="mb-0 text-black">{props.title}</p>
        <span class="text-muted text-xs">{props.date?props.date:""}  <span class={props.messagetype?props.messagetype:""}>{props.message?"  |  "+props.message:""}</span></span>
      </div>
    </label>
  );
}

export default CheckboxItem