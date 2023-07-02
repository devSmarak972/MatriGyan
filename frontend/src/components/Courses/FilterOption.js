import React from 'react';

function FilterOption({ value, label, id, onChange }) {
  return (
    <div className="form-group">
      <div className="custom-control custom-checkbox">
        <input
          className="custom-control-input"
          type="checkbox"
          value={value}
          id={id}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default FilterOption;
