import React from "react";

function Header() {
  return (
    <div
      className="d-flex flex-column flex-sm-row align-items-sm-center mb-24pt"
      style={{"white-space": "nowrap"}}
    >
      <small className="flex text-muted text-headings text-uppercase mr-3 mb-2 mb-sm-0 text-left">
        Displaying 4 out of 10 courses
      </small>
      <div className="w-auto ml-sm-auto table d-flex align-items-center mb-2 mb-sm-0">
        <small className="text-muted text-headings text-uppercase mr-3 d-none d-sm-block">
          Sort by 
        </small>
        <br />
        <a href="/" className="sort desc small text-headings text-uppercase">
          Newest
        </a>
        <br></br>
        <a href="/" className="sort small text-headings text-uppercase ml-2">
          Popularity
        </a>
      </div>

      <a
        href="/"
        data-target="#library-drawer"
        data-toggle="sidebar"
        className="btn btn-sm btn-white ml-sm-16pt"
      >
        <i className="material-icons icon--left">tune</i> Filters
      </a>
    </div>
  );
}

export default Header;
