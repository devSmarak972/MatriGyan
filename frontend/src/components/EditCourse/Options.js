import React, { useEffect } from "react";
import { MultiSelect, Select } from "@mantine/core";

const Options = (props) => {

  const options = props.optionscategory.map((section) => ({
    value: section.category,
    label: section.category,
  }));
  const options1 = props.optionstags.map((section) => ({
    value: section.tagname,
    label: section.tagname,
  }));
  const getoptions = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option);
    const updatedCategory = selectedCategories.map((cat) => ({
      category: cat
    }));
    props.setcategory(updatedCategory);
  };
  
  const getoptions1 = (selectedOptions) => {
    const selectedTags = selectedOptions.map((option) => option);
    const updatedTags = selectedTags.map((tag) => ({ tagname : tag}));
    props.settags(updatedTags);
  };
  
  
  return (
    <div>
      <div className="page-separator">
        <div className="flex items-center gap-2 mb-3 mt-5 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          <span>Options</span>
          <div className="border-1 flex-1 h-0"></div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label className="form-label font-semibold">Category</label>
            <MultiSelect
              placeholder="Pick one"
              data={options}
              {...props.form.getInputProps("category")}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
              onChange={getoptions}
            />
            <small className="form-text text-muted">Select a category.</small>
          </div>
          {/* <div className="form-group">
            <label className="form-label">Price</label>
            <div className="row">
              <div className="col-md-6">
                <div className="input-group form-inline">
                  <span className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </span>
                  <input type="text" className="form-control" value="24" />
                </div>
              </div>
            </div>
            <small className="form-text text-muted">
              The recommended price is between &dollar;17 and &dollar;24
            </small>
          </div> */}
          <div className="form-group mb-0">
            <label className="form-label font-semibold" for="select03">
              Tags
            </label>
            <MultiSelect
              data={options1}
              placeholder="Choose tags"
              {...props.form.getInputProps("tags")}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
              onChange={getoptions1}
            />
            <small className="form-text text-muted">Select one or more tags.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
