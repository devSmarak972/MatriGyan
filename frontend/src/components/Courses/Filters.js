import React, { useState } from "react";
import FilterOption from "./FilterOption";
import Dropdown from "./Dropdown";
import './transition.css'
import { transform } from "framer-motion";
function Filters({ isActive }) {
  const sorts = [
    {value: "", label:"Select"},
    { value: "uploaddate", label: "UploadDate" },
    { value: "rating", label: "Rating" },
    { value: "viewcount", label: "ViewCount" },
    { value: "length", label: "Length" },
  ];
  const durations = [
    {value: "", label:"Select"},
    { value: "uploaddate", label: "UploadDate" },
    { value: "rating", label: "Rating" },
    { value: "viewcount", label: "ViewCount" },
    { value: "length", label: "Length" },
  ];
  const features = [
    {value: "", label:"Select"},
    { value: "uploaddate", label: "UploadDate" },
    { value: "rating", label: "Rating" },
    { value: "viewcount", label: "ViewCount" },
    { value: "length", label: "Length" },
  ];
  const categories = [
    {value: "", label:"Select"},
    { value: "uploaddate", label: "UploadDate" },
    { value: "rating", label: "Rating" },
    { value: "viewcount", label: "ViewCount" },
    { value: "length", label: "Length" },
  ];
  const [sort, setSort] = useState("");
  const [duration, setDuration] = useState("");
  const [fe, setfe] = useState("");
  const [category, setCategory] = useState("");
  const [isreset, setReset] = useState(false);
  const [checkedPlatform, setCheckedPlatform] = useState([]);
  const handleCheckboxPlatform = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedPlatform((prevCheckedPlatform) => [
        ...prevCheckedPlatform,
        value,
      ]);
    } else {
      setCheckedPlatform((prevCheckedPlatform) =>
        prevCheckedPlatform.filter((item) => item !== value)
      );
    }
  };

  const [checkedSubs, setCheckedSubs] = useState([]);
  const handleCheckboxSubs = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedSubs((prevCheckedSubs) => [...prevCheckedSubs, value]);
    } else {
      setCheckedSubs((prevCheckedSubs) =>
        prevCheckedSubs.filter((item) => item !== value)
      );
    }
  };

  const [checkedContentType, setCheckedContentType] = useState([]);
  const handleCheckboxContentType = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedContentType((prevCheckedContentType) => [
        ...prevCheckedContentType,
        value,
      ]);
    } else {
      setCheckedContentType((prevCheckedContentType) =>
        prevCheckedContentType.filter((item) => item !== value)
      );
    }
  };
  const handlechangeSort = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption);
      setSort(selectedOption.value);
    }
    else
    {
      setSort("");
    }
  };
  const handlechangeDuration = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption);
      setDuration(selectedOption.value);
    }
    else
    {
      setDuration("");
    }
  };
  const handlechangeFeatures = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption);
      setfe(selectedOption.value);
    }
    else
    {
      setfe("");
    }
  };
  const handlechangeCategory = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption);
      setCategory(selectedOption.value);
    }
    else
    {
      setCategory("");
    }
  };

  const handleapply = () => {
    const filterOptions = {
      sort,
      duration,
      fe,
      category,
      platform: checkedPlatform,
      subscription: checkedSubs,
      contentType: checkedContentType,
    };
  
    const filterOptionsJSON = JSON.stringify(filterOptions);
    console.log(filterOptionsJSON);
  
    // Send the filter options JSON to the backend or perform any other necessary actions
  };

  const divStyle = {
    transform: isActive ? 'translateX(0%)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
  };
  const handlereset = () =>{
    setSort("");
    setDuration("");
    setfe("");
    setCategory("");
    setCheckedPlatform([]);
    setCheckedSubs([]);
    setCheckedContentType([]);
    setReset(true);
  }
  return (
    <div
      className={`mdk-drawer js-mdk-drawer`}
      id="library-drawer"
      data-align="end"
    >
      <div className="mdk-drawer__content" style={divStyle}>
        <div
          className="sidebar sidebar-light sidebar-right py-16pt"
          style={{ overflowY: "scroll" }}
        >
          <div className="sidebar-heading">Filters</div>
          <Dropdown
            options={sorts}
            onChange={handlechangeSort}
            placeholder="sort by"
          ></Dropdown>

          <Dropdown
            options={durations}
            placeholder="Duration"
            onChange={handlechangeDuration}
          ></Dropdown>

          <Dropdown
            options={features}
            placeholder="Features"
            onChange={handlechangeFeatures}
            value = {sort}
          ></Dropdown>

          <Dropdown
            options={categories}
            placeholder="Category"
            onChange={handlechangeCategory}
          ></Dropdown>

          <div className="sidebar-heading">Platform</div>
          <div className="sidebar-block" style={{ zIndex: "0" }}>
            <FilterOption
              value="Free"
              label="Free"
              id="filtersCheck01"
              onChange={handleCheckboxPlatform}
            />
            <FilterOption
              value="Beginner"
              label="Beginner"
              id="filtersCheck02"
              onChange={handleCheckboxPlatform}
            />
            <FilterOption
              value="Advanced"
              label="Advanced"
              id="filtersCheck03"
              onChange={handleCheckboxPlatform}
            />
          </div>

          <div className="sidebar-heading">Subscription</div>
          <div className="sidebar-block" style={{ zIndex: "0" }}>
            <FilterOption
              value="Free"
              label="Free"
              id="filtersCheck04"
              onChange={handleCheckboxSubs}
            />
            <FilterOption
              value="Beginner"
              label="Beginner"
              id="filtersCheck05"
              onChange={handleCheckboxSubs}
            />
            <FilterOption
              value="Advanced"
              label="Advanced"
              id="filtersCheck06"
              onChange={handleCheckboxSubs}
            />
          </div>

          <div className="sidebar-heading">Content type</div>
          <div className="sidebar-block" style={{ zIndex: "0" }}>
            <FilterOption
              value="Free"
              label="Free"
              id="filtersCheck07"
              onChange={handleCheckboxContentType}
            />
            <FilterOption
              value="Beginner"
              label="Beginner"
              id="filtersCheck08"
              onChange={handleCheckboxContentType}
            />
            <FilterOption
              value="Advanced"
              label="Advanced"
              id="filtersCheck09"
              onChange={handleCheckboxContentType}
            />
          </div>
          <div className="sidebar-block">
          <button type="button" class="btn btn-primary" onClick={handleapply}>Apply</button>
          <button type="button" class="btn btn-primary mx-3" onClick={handlereset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
