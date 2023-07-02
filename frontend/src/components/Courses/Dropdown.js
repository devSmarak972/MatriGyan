import React from "react";
import Select from 'react-select';

function Dropdown({options, placeholder, onChange}) {
  return (
    <div className="sidebar-block">
      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        isClearable
      ></Select>
    </div>
  );
}

export default Dropdown;
